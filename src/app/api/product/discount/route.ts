import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const product = await Product.find();
    const discount = product.filter((product, index) => {
      return product.discount > 0;
    });
    if (product) {
      return NextResponse.json({
        status: 200,
        message: "Product found.",
        data: discount,
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Product not found.",
      });
    }
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
