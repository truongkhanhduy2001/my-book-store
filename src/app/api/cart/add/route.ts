import connectDB from "@/app/lib/connectDB";
import Cart from "@/app/models/Cart";
import { NextResponse, NextRequest } from "next/server";
import Product from "@/app/models/Product";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { userId, productId, quantity, price } = await req.json();
    const product = await Product.findById(productId);
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = await new Cart({
        userId,
        listItem: [],
        total: 0,
      });
    }
    const existedCart = cart.listItem.findIndex((value: any) => {
      return value.productId.toString() === productId;
    });
    if (existedCart > -1) {
      const newQuantity = cart.listItem[existedCart].quantity + quantity;
      if (product.stock < newQuantity) {
        return NextResponse.json({ status: 400, message: "Out of stock." });
      }
      cart.listItem[existedCart].quantity = newQuantity;
      cart.listItem[existedCart].totalPrice = newQuantity * price;
    } else {
      cart.listItem.push({
        productId,
        quantity,
        price,
        totalPrice: quantity * price,
      });
    }
    cart.total += quantity * price;

    await cart.save();
    return NextResponse.json({ status: 200, message: "Cart added." });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
