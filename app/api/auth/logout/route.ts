import { NextResponse } from "next/server";

const CLEAR = {
  path: "/",
  maxAge: 0,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("sicarf_auth", "", {
    httpOnly: true,
    ...CLEAR,
  });
  return res;
}
