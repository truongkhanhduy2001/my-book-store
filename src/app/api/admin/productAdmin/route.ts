import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const {
      name,
      author,
      genre,
      description,
      time,
      price,
      discount,
      year,
      stock,
      language,
      pageCount,
      isBestSeller,
      isNewArrival,
      isDiscount,
    } = await req.json();

    const product = new Product({
      name,
      author,
      genre,
      description,
      time,
      price,
      discount,
      year,
      stock,
      language,
      pageCount,
      isBestSeller,
      isNewArrival,
      isDiscount,
    });

    const savedProduct = await product.save();

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
