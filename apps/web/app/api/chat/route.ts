import { NextRequest, NextResponse } from "next/server";
import { businesses } from "../../../lib/seed";
import { parseIntent } from "../../../lib/ai";
import type { Business } from "@echelon/types";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { message?: string; location?: string };
  const message = (body.message ?? "").trim();
  if (!message) return NextResponse.json({ error: "message required" }, { status: 400 });

  const detected = parseIntent(message, body.location);

  const matches = businesses.filter(
    (b) =>
      !detected.category ||
      b.category.toLowerCase().includes(detected.category.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes((detected.category ?? "").toLowerCase().split(" ")[0] ?? ""))
  );

  return NextResponse.json({
    ...detected,
    businessIds: matches.map((b) => b.id),
    businesses: matches,
  });
}
