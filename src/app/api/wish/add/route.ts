import connectDB from "@/app/lib/connectDB";
import WishList from "@/app/models/WishList";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { userId, productId } = await req.json();
    let wish = await WishList.findOne({ userId });
    console.log(wish);
    if (!wish) {
      wish = new WishList({
        userId,
        listWish: [],
      });
    }
    const existedWish = wish.listWish.findIndex(
      (value: any) => value.productId.toString() === productId
    );
    if (existedWish > -1) {
      wish.listWish.splice(existedWish, 1);
    } else {
      wish.listWish.push({ productId });
    }

    await wish.save();
    return NextResponse.json({ status: 200, message: "Wish list updated." });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
