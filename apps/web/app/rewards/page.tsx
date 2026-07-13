import { RewardsView } from "../../components/consumer/rewards-view";
import { MarketingShell } from "../../components/marketing/site-shell";
import { requireConsumerContext } from "../../lib/auth-context";

export const metadata = {
  title: "Rewards — Echelon",
  description: "Earn points on every booking, review and request across Echelon.",
};

export default async function RewardsPage() {
  await requireConsumerContext("/rewards");

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[900px]">
          <RewardsView />
        </div>
      </main>
    </MarketingShell>
  );
}
