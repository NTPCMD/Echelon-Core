import { NextRequest, NextResponse } from "next/server";
import { businesses } from "../../../lib/seed";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category = searchParams.get("category");
  const location = searchParams.get("location");

  const filtered = businesses.filter(
    (b) =>
      (!category || b.category.toLowerCase().includes(category.toLowerCase())) &&
      (!location || b.city.toLowerCase().includes(location.toLowerCase()) ||
        b.suburb.toLowerCase().includes(location.toLowerCase()))
  );

  return NextResponse.json(filtered);
}
