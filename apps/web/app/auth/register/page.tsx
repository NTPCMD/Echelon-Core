import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { RegisterExperience } from "../../../components/marketing/account-auth";
import { AuthShell } from "../../../components/marketing/auth-shell";
import {
  buildAuthContinuationUrl,
  resolveAuthIntent,
  type AuthSearchParams,
} from "../../../lib/auth-intent";
import { clerkEnabled } from "../../../lib/clerk";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<AuthSearchParams>;
}) {
  const intent = resolveAuthIntent(await searchParams, "register");

  if (clerkEnabled) {
    const { userId } = await auth();
    if (userId) redirect(buildAuthContinuationUrl(intent.mode, intent.returnTo));
  }

  return (
    <AuthShell
      eyebrow="Join Echelon"
      title="One identity. Two private worlds."
      description="Use Echelon personally, run a business, or do both with the same email—without mixing customer and company information."
    >
      <RegisterExperience
        clerkEnabled={clerkEnabled}
        initialMode={intent.mode}
        requestedReturnTo={intent.returnTo}
      />
    </AuthShell>
  );
}
