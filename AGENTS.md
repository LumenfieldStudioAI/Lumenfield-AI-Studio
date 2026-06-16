# Lumenfield AI Studio — Agent Context

## Proje Özeti
Higgsfield.ai benzeri AI SaaS platformu. Next.js 16 + TypeScript + Tailwind + Vercel.

**Site:** https://novaframe-ruddy.vercel.app  
**GitHub:** https://github.com/LumenfieldStudioAI/Lumenfield-AI-Studio

---

## Tech Stack
- **Frontend:** Next.js 16.2.9, React 19, TypeScript, Tailwind CSS 4
- **Auth:** Clerk (Google + Apple + Microsoft SSO)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Cloudflare R2 (lumenfield-media bucket)
- **AI:** fal.ai + Runway ML + ElevenLabs
- **Payments:** Stripe
- **Deploy:** Vercel (auto-deploy on GitHub push)

---

## Mevcut Altyapı ✅
- Clerk Auth kurulu
- Supabase: users, generations, credit_transactions tabloları
- Cloudflare R2 storage
- 25+ AI model registry (lib/models.ts)
- Stripe checkout + webhook routes
- Credits sistemi (add_credits, spend_credits SQL fonksiyonları)
- Pricing sayfası

---

## Master Roadmap

### FAZ 1 — MVP (Şu an)
Kullanıcı → Prompt → Generate → AI çıktı → History → Library

**5 Temel Modül:**
1. AI Görsel Üretme
2. AI Video Üretme  
3. Görsel Düzenleme (Inpaint)
4. Upscale
5. Kullanıcı Kütüphanesi (Library)

### FAZ 2 — Altyapı Tamamlama
- Redis + BullMQ (video queue sistemi)
- Clerk Webhook → Supabase user sync
- R2 public access (üretilen medyalar görünsün)
- Model Router (job queue + polling)

### FAZ 3 — AI Sağlayıcıları
OpenAI Images, fal.ai, Replicate, ElevenLabs, Runway, Flux, Kling, MiniMax, Wan

### FAZ 4 — Veritabanı Şeması
```
users: id, email, name, credits, plan, clerk_id, created_at
generations: id, user_id, prompt, model, type, status, result_url, created_at
credit_transactions: id, user_id, amount, type, stripe_session_id, created_at
```

### FAZ 5 — Storage Mimarisi
- Database sadece URL saklar (result_url)
- Dosyalar R2/S3'te tutulur
- Pre-signed upload URL akışı

### FAZ 6 — API Yapısı
```
/api/stripe/checkout    → Stripe ödeme
/api/stripe/webhook     → Stripe webhook
/api/credits            → Kullanıcı kredit okuma
/api/generate/image     → Görsel üretim
/api/generate/video     → Video üretim
/api/generate/audio     → Ses üretim
/api/clerk/webhook      → Clerk → Supabase sync
/api/library            → Kullanıcı geçmişi
```

### FAZ 7 — Sayfa Yapısı (Higgsfield benzeri)
```
/                       → Ana sayfa
/generate               → Generate hub
/image                  → AI Image
/video                  → AI Video
/audio                  → AI Audio
/edit                   → Inpaint / Edit
/upscale                → Upscale
/library                → Kullanıcı kütüphanesi
/studio                 → Cinema Studio
/marketing-studio       → Marketing Studio
/supercomputer          → Supercomputer
/canvas                 → Canvas
/ai-influencer          → AI Influencer
/character              → Character (Soul ID)
/lipsync                → Lipsync Studio
/apps                   → Apps
/mcp                    → MCP & CLI
/pricing                → Pricing
/sign-in                → Clerk login
/sign-up                → Clerk kayıt
```

### FAZ 8 — Generate Butonu Akışı
```
Prompt → Generate → POST /api/generate/image
→ fal.ai API → Sonuç → R2'ye Kaydedilir
→ Supabase'e Yazılır → Library'de Görünür
```

### FAZ 9 — Queue Sistemi (Video)
```
Generate Video → Job Oluştur → Redis → BullMQ
→ Worker → AI Provider → Storage → Database
```

### FAZ 10 — Stripe Planları
- Free: 100 Credit
- Starter: 500 Credit ($9.99)
- Creator: 1500 Credit ($24.99)
- Pro: 4000 Credit ($59.99)
- Studio: 10000 Credit ($129.99)

---

## Higgsfield Yapısı (Referans)
```
Ana Üretim: Generate, AI Image, AI Video, Edit, Upscale, Library
Stüdyolar: Supercomputer, Marketing Studio, Cinema Studio, Canvas, AI Influencer
Entegrasyonlar: MCP/CLI, Photoshop Plugin, DaVinci Plugin, Chrome Extension
Modeller: Soul, Kling, Seedance, Nano Banana, GPT Image, Seedream, Flux, Veo, Sora, Wan, MiniMax, Topaz
```

---

## Geliştirme Sırası (Şu an)
1. ✅ Stripe entegrasyonu
2. ✅ Credits sistemi (Supabase)
3. ⏳ Clerk Webhook → Supabase sync
4. ⏳ R2 public access
5. ⏳ /library sayfası
6. ⏳ Model Router + job queue
7. ⏳ fal.ai kredisi yükleme

---

## Önemli Notlar
- GitHub web UI kullanılıyor (VS Code yok)
- Vercel auto-deploy: her commit'te otomatik deploy
- Clerk henüz development modunda (production'a geçmek için custom domain lazım)
- Stripe webhook: custom domain gelince eklenecek
- Tüm dosyalar Next.js App Router formatında (app/ dizini)
