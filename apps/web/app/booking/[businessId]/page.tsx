import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingFlow } from "../../../components/marketing/booking-flow";
import { MarketingShell } from "../../../components/marketing/site-shell";
import { businesses } from "../../../lib/seed";

function findBusiness(id: string) {
  return businesses.find((business) => business.id === id || business.slug === id);
}

export async function generateMetadata({ params }: { params: Promise<{ businessId: string }> }): Promise<Metadata> {
  const { businessId } = await params;
  const business = findBusiness(businessId);
  return {
    title: business ? `Book ${business.name} — Echelon` : "Book a service — Echelon",
    description: business ? `Choose a service and live appointment time with ${business.name}.` : "Book a trusted local service on Echelon.",
  };
}

export default async function BookingPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  const business = findBusiness(businessId);
  if (!business) notFound();

  return (
    <MarketingShell>
      <main>
        <BookingFlow business={business} todayIso={new Date().toISOString()} />
      </main>
    </MarketingShell>
  );
}
