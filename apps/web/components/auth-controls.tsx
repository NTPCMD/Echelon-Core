"use client";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

// Clerk-powered auth controls for the top nav. Rendered only when Clerk is
// configured (see lib/clerk.ts); otherwise the page falls back to the
// existing /auth/login and /auth/register links.
export function AuthControls() {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white">
            Login
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="rounded-full bg-brand px-5 py-2 font-semibold text-white hover:opacity-90">
            Sign up
          </button>
        </SignUpButton>
      </Show>
      <Show when="signed-in">
        <UserButton
          appearance={{ elements: { avatarBox: "size-9" } }}
        />
      </Show>
    </>
  );
}
