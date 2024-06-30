import connectDB from "@/app/lib/connectDB";
import WishList from "@/app/models/WishList";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;
export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const wish = await WishList.findOne({ userId }).populate(
      "listWish.productId"
    );
    return NextResponse.json({ status: 200, wish });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
