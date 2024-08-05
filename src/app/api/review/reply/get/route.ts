import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const reviewId = url.searchParams.get("reviewId");

    if (!reviewId) {
      return NextResponse.json({ status: 400, error: "Review ID is required" });
    }

    const review = await Review.findById(reviewId).populate(
      "replies.userId",
      "name"
    );

    if (!review) {
      return NextResponse.json({ status: 404, error: "Review not found" });
    }

    return NextResponse.json({ status: 200, replies: review.replies });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
