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
    const totalProducts = await Product.countDocuments();
    const totalPages = Math.ceil(totalProducts / limit);

    // Truy vấn sản phẩm với phân trang
    const products = await Product.find().skip(skip).limit(limit);
    const arrivalProducts = products.filter(
      (product) => product.time === "new" && product.discount === 0
    );

    if (arrivalProducts.length > 0) {
      return NextResponse.json({
        status: 200,
        message: "Arrival products found.",
        data: arrivalProducts,
        pagination: {
          totalProducts,
          totalPages,
          currentPage: page,
          limit,
        },
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
