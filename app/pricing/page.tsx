import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

const PLANS = [
  {
    name: "Starter",
    credits: 100,
    price: 9,
    features: ["100 kredi", "Tüm modeller", "Library erişimi"],
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID,
  },
  {
    name: "Pro",
    credits: 500,
    price: 29,
    features: ["500 kredi", "Tüm modeller", "Öncelikli kuyruk", "4K çözünürlük"],
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    popular: true,
  },
  {
    name: "Studio",
    credits: 2000,
    price: 79,
    features: ["2000 kredi", "Tüm modeller", "En öncelikli kuyruk", "API erişimi"],
    priceId: process.env.NEXT_PUBLIC_STRIPE_STUDIO_PRICE_ID,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0f1113]">
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <h1 className="text-4xl font-bold text-white mb-4">Fiyatlandırma</h1>
          <p className="text-white/40">Kullandığın kadar öde. İstediğin zaman iptal et.</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-2xl border flex flex-col ${
                plan.popular
                  ? "border-[#e8006f]/50 bg-[#e8006f]/5"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {plan.popular && (
                <span className="text-xs text-[#e8006f] font-medium mb-3">En Popüler</span>
              )}
              <h2 className="text-xl font-bold text-white mb-1">{plan.name}</h2>
              <div className="text-3xl font-bold text-white mb-4">
                ${plan.price}
                <span className="text-sm text-white/30 font-normal">/ay</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-white/50 flex items-center gap-2">
                    <span className="text-[#e8006f]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={`/api/checkout?plan=${plan.name.toLowerCase()}`}
                className={`w-full py-2.5 rounded-xl text-sm font-medium text-center transition-colors ${
                  plan.popular
                    ? "bg-[#e8006f] hover:bg-[#c4005e] text-white"
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                }`}
              >
                Başla
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
