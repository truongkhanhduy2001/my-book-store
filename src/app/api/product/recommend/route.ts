import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { productId } = await req.json();
    const objectIdArray = productId.map((id: any) => new Types.ObjectId(id)); // Chuyển đổi các ID thành ObjectId
    const products = await Product.find({
      _id: { $in: objectIdArray },
    });
    console.log(products);
    return NextResponse.json({
      products: products,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(error);
  }
}
