import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import User from "@/app/models/User";
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

    const [review, user] = await Promise.all([
      Review.findById(reviewId),
      User.findById(userId),
    ]);

    if (!review) {
      return NextResponse.json({ status: 404, error: "Review not found" });
    }

    if (!user) {
      return NextResponse.json({ status: 404, error: "User not found" });
    }

    let isLiked = review.likes.includes(userId);

    if (isLiked) {
      // User has already liked, so unlike
      await Review.findByIdAndUpdate(reviewId, { $pull: { likes: userId } });
      isLiked = false;
    } else {
      // User hasn't liked, so add like
      await Review.findByIdAndUpdate(reviewId, {
        $addToSet: { likes: userId },
      });
      isLiked = true;
    }

    const updatedReview = await Review.findById(reviewId);

    return NextResponse.json({
      status: 200,
      likes: updatedReview.likes.length,
      isLiked: isLiked,
    });
  } catch (error) {
    console.error("Error in like API:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
