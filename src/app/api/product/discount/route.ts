import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const products = await Product.find();
    const discountedProducts = products.filter(
      (products) => products.discount > 0
    );
    if (discountedProducts.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Discounted products found.",
        data: discountedProducts,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "No discounted products found.",
      });
    }
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    return NextResponse.json({ status: 500, error: err.message });
  }
}
