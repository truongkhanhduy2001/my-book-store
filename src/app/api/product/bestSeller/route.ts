import connectDB from "@/app/lib/connectDB";
import { NextResponse, NextRequest } from "next/server";
import Product from "@/app/models/Product";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments({
      sold: { $gt: 15 },
    });

    const bestSellerProducts = await Product.find({ sold: { $gt: 15 } })
      .sort({ sold: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalProducts / limit);

    if (bestSellerProducts.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Best seller products found.",
        data: bestSellerProducts,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalProducts: totalProducts,
        },
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "No best seller products found.",
      });
    }
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    return NextResponse.json({ status: 500, error: err.message });
  }
}
