import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("echelon_user");
  if (!cookie) return NextResponse.json({ user: null });
  try {
    return NextResponse.json({ user: JSON.parse(cookie.value) });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("echelon_user");
  return response;
}
