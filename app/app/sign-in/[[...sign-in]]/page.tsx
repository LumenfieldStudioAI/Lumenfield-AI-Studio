import { SignIn } from '@clerk/nextjs';

export default function Page() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
        Clerk authentication is not configured.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <SignIn />
    </div>
  );
}
