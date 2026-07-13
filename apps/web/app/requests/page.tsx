import { RequestsView } from "../../components/consumer/requests-view";
import { MarketingShell } from "../../components/marketing/site-shell";
import { requireConsumerContext } from "../../lib/auth-context";

export const metadata = {
  title: "Requests — Echelon",
  description: "Everything you've asked the Echelon Concierge to handle, across every module.",
};

export default async function RequestsPage() {
  await requireConsumerContext("/requests");

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1000px]">
          <RequestsView />
        </div>
      </main>
    </MarketingShell>
  );
}
