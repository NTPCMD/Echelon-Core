import { NextRequest, NextResponse } from "next/server";
import { businesses } from "../../../lib/seed";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    businessId?: string;
    serviceId?: string;
    staffName?: string;
    date?: string;
    time?: string;
    customerName?: string;
    customerEmail?: string;
    customerNotes?: string;
  };

  const business = businesses.find((b) => b.id === body.businessId);
  if (!business) return NextResponse.json({ error: "Business not found" }, { status: 404 });

  const service = business.services.find((s) => s.id === body.serviceId);
  if (!service) return NextResponse.json({ error: "Service not found" }, { status: 404 });

  const booking = {
    id: `bkg_${Date.now()}`,
    status: "CONFIRMED",
    business: { id: business.id, name: business.name, suburb: business.suburb },
    service: { id: service.id, name: service.name, priceCents: service.priceCents, durationMinutes: service.durationMinutes },
    staffName: body.staffName,
    date: body.date,
    time: body.time,
    customerName: body.customerName,
    customerEmail: body.customerEmail,
    customerNotes: body.customerNotes,
    createdAt: new Date().toISOString(),
    payment: { status: "pending", provider: "stripe", mode: "stub" },
  };

  return NextResponse.json(booking, { status: 201 });
}
