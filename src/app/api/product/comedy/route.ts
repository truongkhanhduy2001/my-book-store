import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const products = await Product.find();
    const comedyProducts = products.filter((products) =>
      products.genre.includes("Comedy")
    );
    if (comedyProducts.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Comedy products found.",
        data: comedyProducts,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "No comedy products found.",
      });
    }
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    return NextResponse.json({ status: 500, error: err.message });
  }
}
