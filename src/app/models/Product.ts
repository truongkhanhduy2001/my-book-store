import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  description: {
    type: String,
  },
  time: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  image_Id: {
    type: String,
  },
  sold: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
