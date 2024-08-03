import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { reviewId, userId } = await req.json();

    if (!reviewId || !userId) {
      return NextResponse.json({
        status: 400,
        error: "Review ID and User ID are required",
      });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return NextResponse.json({ status: 404, error: "Review not found" });
    }

    const likeIndex = review.likes.indexOf(userId);

    if (likeIndex > -1) {
      // User has already liked, so unlike
      review.likes.splice(likeIndex, 1);
    } else {
      // User hasn't liked, so add like
      review.likes.push(userId);
    }

    await review.save();

    return NextResponse.json({ status: 200, likes: review.likes.length });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
