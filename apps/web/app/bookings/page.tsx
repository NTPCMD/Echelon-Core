import { BookingsView } from "../../components/consumer/bookings-view";
import { MarketingShell } from "../../components/marketing/site-shell";
import { requireConsumerContext } from "../../lib/auth-context";

export const metadata = {
  title: "Your bookings — Echelon",
  description: "Manage your upcoming, past and cancelled bookings across Echelon.",
};

export default async function BookingsPage() {
  await requireConsumerContext("/bookings");

  return (
    <MarketingShell>
      <main className="min-h-[calc(100vh-72px)] bg-[#0b0b0f] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-[1120px]">
          <BookingsView />
        </div>
      </main>
    </MarketingShell>
  );
}
