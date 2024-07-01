import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const products = await Product.find();
    const arrivalProducts = products.filter(
      (products) => products.time === "new" && products.discount === 0
    );
    if (arrivalProducts.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Arrival products found.",
        data: arrivalProducts,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "No arrival products found.",
      });
    }
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    return NextResponse.json({ status: 500, error: err.message });
  }
}
