import mongoose from "mongoose";
import "./User";
import "./Product";

const WishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  listWish: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
});

export default mongoose.models.WishList ||
  mongoose.model("WishList", WishListSchema);
