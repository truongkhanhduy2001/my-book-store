import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    // Nhận tham số phân trang từ yêu cầu
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Tổng số sản phẩm
    const total = await Product.countDocuments({
      genre: { $regex: "Adventure", $options: "i" },
    });

    // Truy vấn sản phẩm với điều kiện có chứa "Adventure" trong genre và phân trang
    const adventureProducts = await Product.find({
      genre: { $regex: "Adventure", $options: "i" },
    })
      .skip(skip)
      .limit(limit);

    // Tính tổng số trang
    const totalPages = Math.ceil(total / limit);

    if (adventureProducts.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Adventure products found.",
        data: adventureProducts,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: total,
        },
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "No adventure products found.",
      });
    }
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    return NextResponse.json({ status: 500, error: err.message });
  }
}
