import connectDB from "@/app/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
import Product from "@/app/models/Product";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  // Tìm kiếm các sản phẩm có số lượng bán ra (sold) lớn hơn 20
  const products = await Product.find({ sold: { $gt: 15 } })
    .sort({ sold: -1 })
    .limit(10);

  return NextResponse.json(products);
}
