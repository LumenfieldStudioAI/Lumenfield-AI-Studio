"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Generate", href: "/generate" },
  { label: "Library", href: "/library" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/5 bg-[#0f1113]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-screen-xl h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-white">
          <span className="text-xl font-bold tracking-tight">
            Lumen<span className="text-[#e8006f]">field</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm transition-colors",
                pathname === item.href
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-2">
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="text-sm text-white/70 hover:text-white px-3 py-1.5 transition-colors">
                  Giriş
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm bg-[#e8006f] hover:bg-[#c4005e] text-white px-4 py-1.5 rounded-lg transition-colors font-medium">
                  Başla
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
