import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export const revalidate = 0;
// Function to handle GET requests
export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const _id = req.nextUrl.searchParams.get("id");

    if (_id) {
      const product = await Product.findById(new ObjectId(_id));
      if (!product) {
        return NextResponse.json({
          status: 400,
          message: "Product not found.",
        });
      }
      return NextResponse.json({
        status: 200,
        product,
        message: "Product found.",
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Product ID is required.",
      });
    }
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
