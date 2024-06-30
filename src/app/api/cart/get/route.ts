import connectDB from "@/app/lib/connectDB";
import Cart from "@/app/models/Cart";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.nextUrl);
    const id = url.searchParams.get("id");
    const cart = await Cart.findOne({ userId: id }).populate(
      "listItem.productId",
      "name image genre"
    );
    return NextResponse.json({ status: 200, cart });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
