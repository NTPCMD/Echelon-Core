import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusiness } from "../../../lib/api";

export const dynamic = "force-dynamic";

export default async function BusinessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const business = await getBusiness(id);
  if (!business) notFound();
  return <main className="px-6 py-10"><div className="mx-auto max-w-6xl"><div className="h-80 rounded-3xl bg-gradient-to-br from-brand to-amber-200"/><h1 className="mt-8 text-5xl font-semibold">{business.name}</h1><p className="mt-3 text-black/60">{business.category} in {business.suburb}. ★ {business.rating}</p><div className="mt-8 grid gap-4 md:grid-cols-2">{business.services.map((service) => <div className="rounded-3xl bg-white p-6 shadow-sm" key={service.id}><h2 className="text-2xl font-semibold">{service.name}</h2><p className="mt-2">{service.description}</p><Link className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-white" href={`/booking/${business.id}`}>Book now</Link></div>)}</div></div></main>;
}
