import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import { NextResponse, NextRequest } from "next/server";
import { SortOrder } from "mongoose";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const sort = url.searchParams.get("sort") || "newest";

    let query = id ? { productId: id } : {};
    let sortOption: { [key: string]: SortOrder } =
      sort === "newest" ? { createdAt: -1 } : { createdAt: 1 };

    const reviews = await Review.find(query)
      .populate("userId", "name")
      .sort(sortOption);

    return NextResponse.json({
      status: 200,
      reviews,
      totalComments: reviews.length,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
