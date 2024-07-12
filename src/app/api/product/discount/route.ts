import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    // Nhận tham số phân trang từ yêu cầu
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = Number.MAX_SAFE_INTEGER;
    const skip = (page - 1) * limit;

    // Tính tổng số sản phẩm để xác định tổng số trang
    const totalProducts = await Product.countDocuments({
      discount: { $gt: 0 },
    });

    // Truy vấn sản phẩm với phân trang
    const discountedProducts = await Product.find({ discount: { $gt: 0 } })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalProducts / limit);

    if (discountedProducts.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Discounted products found.",
        data: discountedProducts,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalProducts: totalProducts,
        },
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "No discounted products found.",
      });
    }
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    return NextResponse.json({ status: 500, error: err.message });
  }
}
