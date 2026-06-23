import { supabaseAdmin } from "./supabase-admin";
import { MODEL_COST_MAP } from "./models";

export async function getUserCredits(clerkUserId: string): Promise<number> {
  const { data } = await supabaseAdmin
    .from("users")
    .select("credits")
    .eq("clerk_user_id", clerkUserId)
    .single();
  return data?.credits ?? 0;
}

export async function spendCredits(
  clerkUserId: string,
  amount: number
): Promise<{ ok: boolean; newBalance?: number }> {
  const { data, error } = await supabaseAdmin.rpc("spend_credits", {
    p_clerk_user_id: clerkUserId,
    p_amount: amount,
  });
  if (error) return { ok: false };
  return { ok: true, newBalance: data };
}

export function getCreditCost(modelId: string): number {
  return MODEL_COST_MAP[modelId] ?? 4;
}
