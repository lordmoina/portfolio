import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { action, password } = await request.json();

  if (action === "login") {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_session", "true", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60,
      path: "/",
    });
    return res;
  }

  if (action === "logout") {
    const res = NextResponse.json({ success: true });
    res.cookies.delete("admin_session");
    return res;
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
