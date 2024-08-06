import mongoose from "mongoose";
import "./User";
import "./Product";

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listItem: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
