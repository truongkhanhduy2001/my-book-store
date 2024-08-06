import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const sort = searchParams.get("sort") || "newest";

    if (!id) {
      return NextResponse.json({
        status: 400,
        error: "Product ID is required",
      });
    }

    let query = Review.find({ productId: id }).populate("userId", "name");

    if (sort === "newest") {
      query = query.sort({ createdAt: -1 });
    } else if (sort === "mostLiked") {
      query = query.sort({ "likes.length": -1 });
    }

    const reviews = await query.lean().exec();
    return NextResponse.json({ status: 200, reviews });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({
      status: 500,
      error: "Internal server error",
      message: error.message,
    });
  }
}
