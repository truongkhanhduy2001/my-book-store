import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids")?.split(",") || [];

    if (ids.length === 0) {
      return NextResponse.json({
        status: 400,
        error: "Product IDs are required",
      });
    }

    const reviews = await Review.find({ productId: { $in: ids } })
      .populate("userId", "name")
      .lean()
      .exec();

    // Nhóm reviews theo productId
    const reviewsByProduct = reviews.reduce((acc: any, review: any) => {
      if (!acc[review.productId]) {
        acc[review.productId] = [];
      }
      acc[review.productId].push(review);
      return acc;
    }, {});

    return NextResponse.json({ status: 200, reviews: reviewsByProduct });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal server error",
      message: error.message,
    });
  }
}
