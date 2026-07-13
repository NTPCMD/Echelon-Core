import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AuthShell } from "../../components/marketing/auth-shell";
import { BusinessOnboarding } from "../../components/marketing/business-onboarding";
import {
  buildAuthEntryUrl,
  destinationForMode,
  type AuthSearchParams,
} from "../../lib/auth-intent";
import { clerkEnabled } from "../../lib/clerk";

export default async function BusinessOnboardingPage({
  searchParams,
}: {
  searchParams: Promise<AuthSearchParams>;
}) {
  const params = await searchParams;
  const requestedReturnTo = Array.isArray(params.returnTo) ? params.returnTo[0] : params.returnTo;
  const returnTo = destinationForMode("business", requestedReturnTo, "register");

  if (!clerkEnabled) redirect(returnTo);

  const { userId } = await auth();
  if (!userId) redirect(buildAuthEntryUrl("login", "business", returnTo));

  return (
    <AuthShell
      eyebrow="Business workspace"
      title="Your company stays its own."
      description="A business workspace creates a separate Clerk organization context while preserving one simple sign-in for you."
    >
      <BusinessOnboarding returnTo={returnTo} />
    </AuthShell>
  );
}
