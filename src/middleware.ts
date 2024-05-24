import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/cart", "/checkout", "/wishlist"];

export default async function middleware(req: any) {
  const { pathname } = req.nextUrl;
  const cookieStore = cookies();
  const accessTokenUser: any = cookieStore.get("TOKEN-USER");

  if (!accessTokenUser && protectedRoutes.includes(pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
