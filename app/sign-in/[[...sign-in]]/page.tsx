import { SignIn } from '@clerk/nextjs';

export default function Page() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#050505', color: 'white' }}>
        Clerk authentication is not configured.
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
      <SignIn />
    </div>
  );
}
