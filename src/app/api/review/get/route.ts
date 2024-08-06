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

    let reviews = await Review.find({ productId: id }).populate(
      "userId",
      "name"
    );

    if (sort === "newest") {
      reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (sort === "mostLiked") {
      reviews.sort((a, b) => b.likes.length - a.likes.length);
    }

    return NextResponse.json({ status: 200, reviews });
  } catch (error: any) {
    console.error("Error fetching reviews:", error.message);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
