import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { reviewId, userId, content } = await req.json();

    if (!reviewId || !userId || !content) {
      return NextResponse.json({
        status: 400,
        error: "All fields are required",
      });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return NextResponse.json({ status: 404, error: "Review not found" });
    }

    review.replies.push({ userId, content, createdAt: new Date() });
    await review.save();

    return NextResponse.json({
      status: 201,
      message: "Reply added successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
