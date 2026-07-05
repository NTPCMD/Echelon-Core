import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { email?: string; password?: string };
  if (!body.email || !body.password)
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });

  // Dev stub — any valid email/password succeeds
  const user = { id: `usr_dev`, name: body.email.split("@")[0], email: body.email, role: "CUSTOMER" };
  const response = NextResponse.json({ user, accessToken: "dev-token" });
  response.cookies.set("echelon_user", JSON.stringify(user), { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
