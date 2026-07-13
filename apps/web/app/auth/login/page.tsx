import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LoginExperience } from "../../../components/marketing/account-auth";
import { AuthShell } from "../../../components/marketing/auth-shell";
import {
  buildAuthContinuationUrl,
  resolveAuthIntent,
  type AuthSearchParams,
} from "../../../lib/auth-intent";
import { clerkEnabled } from "../../../lib/clerk";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<AuthSearchParams>;
}) {
  const intent = resolveAuthIntent(await searchParams, "login");

  if (clerkEnabled) {
    const { userId } = await auth();
    if (userId) redirect(buildAuthContinuationUrl(intent.mode, intent.returnTo));
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Return to your Echelon."
      description="One secure identity can move between your personal account and every business workspace you belong to."
    >
      <LoginExperience
        clerkEnabled={clerkEnabled}
        initialMode={intent.mode}
        requestedReturnTo={intent.returnTo}
      />
    </AuthShell>
  );
}
