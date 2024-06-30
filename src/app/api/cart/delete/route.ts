import connectDB from "@/app/lib/connectDB";
import Cart from "@/app/models/Cart";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    const { userId, productId } = await req.json();

    // Remove the item from the cart
    await Cart.updateOne(
      { userId },
      { $pull: { listItem: { productId: productId } } }
    );

    // Recalculate the total price
    const cart = await Cart.findOne({ userId });
    const total = cart.listItem.reduce(
      (sum: any, item: any) => sum + item.totalPrice,
      0
    );
    cart.total = total;
    await cart.save();

    return NextResponse.json({
      status: 200,
      message: "Cart item deleted successfully",
      cart,
    });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
