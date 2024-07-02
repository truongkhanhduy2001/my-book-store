import connectDB from "@/app/lib/connectDB";
import Order from "@/app/models/Order";
import Cart from "@/app/models/Cart";
import { NextResponse, NextRequest } from "next/server";
import Product from "@/app/models/Product";
import { startSession } from "mongoose";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await startSession();

  try {
    const { userId, name, address, city, district, ward, telephone } =
      await req.json();

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ status: 404, error: "Cart not found." });
    }

    // bat dau mot phien giao dich
    session.startTransaction();

    for (let i = 0; i < cart.listItem.length; i++) {
      const product = await Product.findOne({
        _id: cart.listItem[i].productId,
      }).session(session);

      if (!product) {
        return NextResponse.json({ status: 404, error: "Product not found." });
      }

      if (product.stock >= cart.listItem[i].quantity) {
        product.stock -= cart.listItem[i].quantity;
        product.sold += cart.listItem[i].quantity;
        await product.save({ session });
      } else {
        throw new Error("Product out of stock.");
      }
    }

    await Cart.deleteOne({ userId }).session(session);

    const order = new Order({
      userId,
      name,
      address,
      city,
      district,
      ward,
      telephone,
      payment: "Direct Payment",
      listOrder: cart.listItem,
      createdAt: new Date(),
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ status: 200, message: "Order added." });
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ status: 500, error: err.message });
  }
}
