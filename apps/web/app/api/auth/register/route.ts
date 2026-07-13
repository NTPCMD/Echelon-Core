import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { name?: string; email?: string; password?: string; role?: string };
  if (!body.name || !body.email || !body.password)
    return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
  if (body.password.length < 8)
    return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });

  const user = { id: `usr_${Date.now()}`, name: body.name, email: body.email, role: body.role ?? "CUSTOMER" };
  const response = NextResponse.json({ user, accessToken: "dev-token" }, { status: 201 });
  response.cookies.set("echelon_user", JSON.stringify(user), { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return response;
}
