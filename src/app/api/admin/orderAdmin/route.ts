import connectDB from "@/app/lib/connectDB";
import Order from "@/app/models/Order";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export const revalidate = 0;

// Trong file API (ví dụ: /api/admin/orderAdmin.ts)

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const _id = req.nextUrl.searchParams.get("id");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10);

    if (_id) {
      const order = await Order.findById(new ObjectId(_id)).populate(
        "listOrder.productId"
      );
      if (!order) {
        return NextResponse.json({
          status: 400,
          message: "Order not found.",
        });
      }
      return NextResponse.json({ status: 200, order });
    } else {
      const orders = await Order.find()
        .populate("listOrder.productId")
        .skip((page - 1) * limit)
        .limit(limit);
      const totalOrders = await Order.countDocuments();
      return NextResponse.json({
        status: 200,
        orders,
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
      });
    }
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ status: 500, error: err.message });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  try {
    const _id = req.nextUrl.searchParams.get("id");

    if (!_id) {
      return NextResponse.json({
        status: 400,
        message: "Order ID is required.",
      });
    }

    const deletedOrder = await Order.findByIdAndDelete(new ObjectId(_id));

    if (!deletedOrder) {
      return NextResponse.json({
        status: 404,
        message: "Order not found.",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Order deleted successfully.",
      deletedOrder,
    });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json({ status: 500, error: err.message });
  }
}
