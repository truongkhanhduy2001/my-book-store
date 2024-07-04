import connectDB from "@/app/lib/connectDB";
import WishList from "@/app/models/WishList";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const userId = req.nextUrl.searchParams.get("userId");
    // Retrieve page and limit from query parameters, or use default values
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Modify the query to support pagination
    const wishListQuery = WishList.findOne({ userId }).populate(
      "listWish.productId"
    );
    const wishList = await wishListQuery.skip(skip).limit(limit);

    // Optionally, you can also return the total number of documents to help with pagination on the client side
    const total = await WishList.countDocuments({ userId });

    return NextResponse.json({
      status: 200,
      data: wishList,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
