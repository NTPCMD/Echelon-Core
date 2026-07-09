// Single source of truth for whether Clerk auth is wired up. Clerk requires a
// publishable key at build time; when it is absent the app falls back to the
// existing cookie-based auth stub so the deployment stays green.
export const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
