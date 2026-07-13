import { ApplicationsView } from "../../components/consumer/applications-view";
import { MarketingShell } from "../../components/marketing/site-shell";
import { requireConsumerContext } from "../../lib/auth-context";

export const metadata = {
  title: "Applications — Echelon",
  description: "Track your job applications and freelance pitches.",
};

export default async function ApplicationsPage() {
  await requireConsumerContext("/applications");

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1000px]">
          <ApplicationsView />
        </div>
      </main>
    </MarketingShell>
  );
}
