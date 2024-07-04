import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Tổng số sản phẩm
    const total = await Product.countDocuments({
      genre: { $regex: "Comedy", $options: "i" },
    });

    // Truy vấn sản phẩm với điều kiện có chứa "Comedy" trong genre và phân trang
    const comedyProducts = await Product.find({
      genre: { $regex: "Comedy", $options: "i" },
    })
      .skip(skip)
      .limit(limit);

    // Tính tổng số trang
    const totalPages = Math.ceil(total / limit);

    if (comedyProducts.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Comedy products found.",
        data: comedyProducts,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: total,
        },
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
