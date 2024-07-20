import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { userId, productId, rating, comment } = await req.json();

    if (!userId || !productId || !rating || !comment) {
      return NextResponse.json({
        status: 400,
        error: "All fields are required",
      });
    }

    const newReview = new Review({
      userId,
      productId,
      rating,
      comment,
    });

    await newReview.save();

    const populatedReview = await Review.findById(newReview._id).populate(
      "userId",
      "name"
    );

    return NextResponse.json({ status: 201, review: populatedReview });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
