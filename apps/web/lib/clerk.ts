const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;

export const clerkEnabled = Boolean(publishableKey && secretKey);

if (process.env.VERCEL_ENV === "production" && !clerkEnabled) {
  throw new Error(
    "Clerk is required in production. Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in Vercel.",
  );
}
