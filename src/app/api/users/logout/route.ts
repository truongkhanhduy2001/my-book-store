import { NextResponse, NextRequest } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    // Xóa cookie bằng cách đặt giá trị cookie là rỗng và thời gian sống là -1
    const cookie = serialize("TOKEN-USER", "", {
      maxAge: -1,
      path: "/",
    });

    // Tạo một response với cookie đã được set
    const res = NextResponse.json({
      status: 200,
      message: "Logout successful",
    });
    res.headers.set("Set-Cookie", cookie);

    return res;
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
