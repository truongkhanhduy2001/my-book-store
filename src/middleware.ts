import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedUserRoutes = ["/cart", "/checkout", "/wishlist"];
const protectedAdminRoutes = [
  "/admin",
  "/admin/Product/Add",
  "/admin/Product/List",
];

export default async function middleware(req: any) {
  const { pathname } = req.nextUrl;
  const cookieStore = cookies();
  const accessTokenUser: any = cookieStore.get("TOKEN-USER");
  const accessTokenAdmin = cookieStore.get("TOKEN-ADMIN");

  if (!accessTokenUser && protectedUserRoutes.includes(pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (!accessTokenAdmin && protectedAdminRoutes.includes(pathname)) {
    const absoluteURL = new URL("/admin/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  //  Nếu người dùng đã đăng nhập và cố gắng truy cập vào /login, chuyển hướng họ về trang chính
  if (accessTokenUser && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin).toString());
  }

  // Nếu admin đã đăng nhập và cố gắng truy cập vào /admin/login, chuyển hướng họ về trang admin
  if (accessTokenAdmin && pathname === "/admin/login") {
    return NextResponse.redirect(
      new URL("/admin", req.nextUrl.origin).toString()
    );
  }
}
