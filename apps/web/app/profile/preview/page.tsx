import { ProfilePublic } from "../../../components/consumer/profile-public";
import { MarketingShell } from "../../../components/marketing/site-shell";
import { requireConsumerContext } from "../../../lib/auth-context";
import { consumerProfile } from "../../../lib/profile";

export const metadata = {
  title: "Public profile preview — Echelon",
  description: "How businesses see your profile when you apply or pitch.",
};

export default async function ProfilePreviewPage() {
  await requireConsumerContext("/profile/preview");

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <ProfilePublic profile={consumerProfile} />
      </main>
    </MarketingShell>
  );
}
