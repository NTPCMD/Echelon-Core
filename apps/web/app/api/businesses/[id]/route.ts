import { NextRequest, NextResponse } from "next/server";
import { businesses } from "../../../../lib/seed";

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const business = businesses.find((b) => b.id === params.id || b.slug === params.id);
  if (!business) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(business);
}
