import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const reviews = id
      ? await Review.find({ productId: id }).populate("userId", "name")
      : await Review.find().populate("userId", "name");
    return NextResponse.json({ status: 200, reviews });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
