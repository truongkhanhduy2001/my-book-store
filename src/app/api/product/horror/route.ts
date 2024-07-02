import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const products = await Product.find();
    const horrorProducts = products.filter((products) =>
      products.genre.includes("Horror")
    );
    if (horrorProducts.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Horror products found.",
        data: horrorProducts,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "No horror products found.",
      });
    }
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    return NextResponse.json({ status: 500, error: err.message });
  }
}
