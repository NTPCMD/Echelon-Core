import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AuthContinuation } from "../../../components/marketing/auth-continuation";
import { AuthShell } from "../../../components/marketing/auth-shell";
import {
  buildAuthEntryUrl,
  resolveAuthIntent,
  type AuthSearchParams,
} from "../../../lib/auth-intent";
import { clerkEnabled } from "../../../lib/clerk";

export default async function AuthContinuePage({
  searchParams,
}: {
  searchParams: Promise<AuthSearchParams>;
}) {
  const intent = resolveAuthIntent(await searchParams, "login");

  if (!clerkEnabled) redirect(intent.returnTo);

  const { userId } = await auth();
  if (!userId) redirect(buildAuthEntryUrl("login", intent.mode, intent.returnTo));

  return (
    <AuthShell
      eyebrow="Account context"
      title="The right space, every time."
      description="Echelon verifies whether this request belongs to your personal account or a business workspace before private data is loaded."
    >
      <AuthContinuation mode={intent.mode} returnTo={intent.returnTo} />
    </AuthShell>
  );
}
