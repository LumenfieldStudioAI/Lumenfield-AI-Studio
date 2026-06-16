-- ============================================
-- Lumenfield AI — Credits System Migration
-- ============================================

-- 1️⃣ USER CREDITS TABLE
-- Her kullanıcının mevcut kredi bakiyesi
-- ============================================
CREATE TABLE IF NOT EXISTS user_credits (
  user_id      TEXT PRIMARY KEY,           -- Clerk user ID
  credits      INTEGER NOT NULL DEFAULT 0, -- Mevcut bakiye
  total_earned INTEGER NOT NULL DEFAULT 0, -- Hayat boyu kazanılan
  total_spent  INTEGER NOT NULL DEFAULT 0, -- Hayat boyu harcanan
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT credits_non_negative CHECK (credits >= 0)
);

CREATE INDEX IF NOT EXISTS idx_user_credits_updated_at 
  ON user_credits(updated_at DESC);


-- 2️⃣ CREDIT TRANSACTIONS TABLE
-- Tüm satın alma ve kullanım geçmişi (audit log + idempotency)
-- ============================================
CREATE TABLE IF NOT EXISTS credit_transactions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             TEXT NOT NULL,
  type                TEXT NOT NULL,        -- 'purchase' | 'usage' | 'refund' | 'bonus'
  credits             INTEGER NOT NULL,     -- + ekleme, - harcama
  balance_after       INTEGER NOT NULL,     -- İşlem sonrası bakiye
  
  -- Stripe ile ilgili alanlar (purchase için)
  stripe_session_id   TEXT UNIQUE,          -- ← IDEMPOTENCY KEY
  stripe_payment_id   TEXT,
  amount_paid         INTEGER,              -- Cent cinsinden
  currency            TEXT,
  package_id          TEXT,                 -- 'starter' | 'creator' | 'pro' | 'studio'
  
  -- Usage ile ilgili alanlar
  generation_id       TEXT,                 -- Hangi generation için harcandı
  description         TEXT,
  
  status              TEXT NOT NULL DEFAULT 'completed', -- 'pending' | 'completed' | 'failed' | 'refunded'
  metadata            JSONB,                -- Esnek ek veri
  
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  CONSTRAINT valid_type CHECK (type IN ('purchase', 'usage', 'refund', 'bonus')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'completed', 'failed', 'refunded'))
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id 
  ON credit_transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_stripe_session 
  ON credit_transactions(stripe_session_id) 
  WHERE stripe_session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_transactions_type 
  ON credit_transactions(type);


-- 3️⃣ FUNCTION: Atomic kredi ekleme (purchase için)
-- ============================================
CREATE OR REPLACE FUNCTION add_credits(
  p_user_id           TEXT,
  p_credits           INTEGER,
  p_stripe_session_id TEXT,
  p_amount_paid       INTEGER,
  p_currency          TEXT,
  p_package_id        TEXT
) RETURNS TABLE (
  new_balance     INTEGER,
  transaction_id  UUID,
  already_processed BOOLEAN
) AS $$
DECLARE
  v_existing_tx_id UUID;
  v_new_balance    INTEGER;
  v_tx_id          UUID;
BEGIN
  -- IDEMPOTENCY: Bu session daha önce işlendi mi?
  SELECT id INTO v_existing_tx_id
  FROM credit_transactions
  WHERE stripe_session_id = p_stripe_session_id;
  
  IF v_existing_tx_id IS NOT NULL THEN
    -- Zaten işlenmiş, mevcut bakiyeyi döndür
    SELECT credits INTO v_new_balance 
    FROM user_credits 
    WHERE user_id = p_user_id;
    
    RETURN QUERY SELECT v_new_balance, v_existing_tx_id, TRUE;
    RETURN;
  END IF;

  -- Kullanıcının kredisini artır (yoksa oluştur)
  INSERT INTO user_credits (user_id, credits, total_earned)
  VALUES (p_user_id, p_credits, p_credits)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    credits      = user_credits.credits + p_credits,
    total_earned = user_credits.total_earned + p_credits,
    updated_at   = NOW()
  RETURNING credits INTO v_new_balance;

  -- Transaction kaydı oluştur
  INSERT INTO credit_transactions (
    user_id, type, credits, balance_after,
    stripe_session_id, amount_paid, currency, package_id, status
  ) VALUES (
    p_user_id, 'purchase', p_credits, v_new_balance,
    p_stripe_session_id, p_amount_paid, p_currency, p_package_id, 'completed'
  ) RETURNING id INTO v_tx_id;

  RETURN QUERY SELECT v_new_balance, v_tx_id, FALSE;
END;
$$ LANGUAGE plpgsql;


-- 4️⃣ FUNCTION: Atomic kredi düşme (generation için)
-- ============================================
CREATE OR REPLACE FUNCTION deduct_credits(
  p_user_id       TEXT,
  p_credits       INTEGER,
  p_generation_id TEXT DEFAULT NULL,
  p_description   TEXT DEFAULT NULL
) RETURNS TABLE (
  success        BOOLEAN,
  new_balance    INTEGER,
  transaction_id UUID,
  error_message  TEXT
) AS $$
DECLARE
  v_current_balance INTEGER;
  v_new_balance     INTEGER;
  v_tx_id           UUID;
BEGIN
  -- Row-level lock ile mevcut bakiyeyi al
  SELECT credits INTO v_current_balance
  FROM user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  -- Kullanıcı yoksa
  IF v_current_balance IS NULL THEN
    RETURN QUERY SELECT FALSE, 0, NULL::UUID, 'Kullanıcı bulunamadı'::TEXT;
    RETURN;
  END IF;

  -- Yetersiz bakiye
  IF v_current_balance < p_credits THEN
    RETURN QUERY SELECT FALSE, v_current_balance, NULL::UUID, 'Yetersiz kredi'::TEXT;
    RETURN;
  END IF;

  -- Krediyi düş
  UPDATE user_credits
  SET 
    credits     = credits - p_credits,
    total_spent = total_spent + p_credits,
    updated_at  = NOW()
  WHERE user_id = p_user_id
  RETURNING credits INTO v_new_balance;

  -- Transaction kaydı
  INSERT INTO credit_transactions (
    user_id, type, credits, balance_after,
    generation_id, description, status
  ) VALUES (
    p_user_id, 'usage', -p_credits, v_new_balance,
    p_generation_id, p_description, 'completed'
  ) RETURNING id INTO v_tx_id;

  RETURN QUERY SELECT TRUE, v_new_balance, v_tx_id, NULL::TEXT;
END;
$$ LANGUAGE plpgsql;


-- 5️⃣ FUNCTION: Bonus/promo kredisi verme (admin için)
-- ============================================
CREATE OR REPLACE FUNCTION grant_bonus_credits(
  p_user_id     TEXT,
  p_credits     INTEGER,
  p_description TEXT DEFAULT 'Bonus credits'
) RETURNS INTEGER AS $$
DECLARE
  v_new_balance INTEGER;
BEGIN
  INSERT INTO user_credits (user_id, credits, total_earned)
  VALUES (p_user_id, p_credits, p_credits)
  ON CONFLICT (user_id)
  DO UPDATE SET 
    credits      = user_credits.credits + p_credits,
    total_earned = user_credits.total_earned + p_credits,
    updated_at   = NOW()
  RETURNING credits INTO v_new_balance;

  INSERT INTO credit_transactions (
    user_id, type, credits, balance_after, description, status
  ) VALUES (
    p_user_id, 'bonus', p_credits, v_new_balance, p_description, 'completed'
  );

  RETURN v_new_balance;
END;
$$ LANGUAGE plpgsql;


-- 6️⃣ TRIGGER: updated_at otomatik güncelleme
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON user_credits;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON user_credits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();


-- 7️⃣ ROW LEVEL SECURITY (Supabase kullanıyorsan)
-- ============================================
-- ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Users can view own credits"
--   ON user_credits FOR SELECT
--   USING (user_id = auth.jwt() ->> 'sub');

-- CREATE POLICY "Users can view own transactions"
--   ON credit_transactions FOR SELECT
--   USING (user_id = auth.jwt() ->> 'sub');


-- ============================================
-- ✅ MIGRATION COMPLETE
-- ============================================
