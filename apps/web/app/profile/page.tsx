import { ProfileView } from "../../components/consumer/profile-view";
import { MarketingShell } from "../../components/marketing/site-shell";
import { requireConsumerContext } from "../../lib/auth-context";
import { consumerProfile } from "../../lib/profile";

export const metadata = {
  title: "Your profile — Echelon",
  description: "Your job-seeker and freelancer profile — one identity across Echelon.",
};

export default async function ProfilePage() {
  await requireConsumerContext("/profile");

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[900px]">
          <ProfileView profile={consumerProfile} />
        </div>
      </main>
    </MarketingShell>
  );
}
