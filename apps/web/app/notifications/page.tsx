import { NotificationsView } from "../../components/consumer/notifications-view";
import { MarketingShell } from "../../components/marketing/site-shell";
import { requireConsumerContext } from "../../lib/auth-context";

export const metadata = {
  title: "Notifications — Echelon",
  description: "Bookings, applications, requests and rewards — as they happen.",
};

export default async function NotificationsPage() {
  await requireConsumerContext("/notifications");

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[760px]">
          <NotificationsView />
        </div>
      </main>
    </MarketingShell>
  );
}
