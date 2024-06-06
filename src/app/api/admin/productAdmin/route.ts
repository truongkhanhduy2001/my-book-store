import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const {
      image,
      name,
      author,
      genre,
      description,
      time,
      price,
      discount,
      year,
      stock,
      language,
      pageCount,
      isBestSeller,
      isNewArrival,
      isDiscount,
    } = await req.json();

    // Validate field formats
    if (
      price < 0 ||
      year < 1000 ||
      year > new Date().getFullYear() ||
      stock < 0 ||
      pageCount < 1
    ) {
      return NextResponse.json({
        success: false,
        message: "Invalid values provided.",
      });
    }

    // Logical consistency checks
    if (discount >= price) {
      return NextResponse.json({
        success: false,
        message: "Discount price must be less than the original price.",
      });
    }

    // Check for existing product with the same name and author
    const existingProduct = await Product.findOne({ image });
    if (existingProduct) {
      return NextResponse.json({
        success: false,
        message: "A product with the same image already exists.",
      });
    }

    const product = new Product({
      image,
      name,
      author,
      genre,
      description,
      time,
      price,
      discount,
      year,
      stock,
      language,
      pageCount,
      isBestSeller,
      isNewArrival,
      isDiscount,
    });

    const savedProduct = await product.save();

    return NextResponse.json({
      success: true,
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

// Function to handle GET requests
export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const _id = req.nextUrl.searchParams.get("_id");
    if (_id) {
      const product = await Product.findById(new ObjectId(_id));
      if (!product) {
        return NextResponse.json({
          success: false,
          message: "Product not found.",
        });
      }
      return NextResponse.json({ success: true, product });
    } else {
      const products = await Product.find();
      return NextResponse.json({ success: true, products });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

// Function to handle PUT requests
export async function PUT(req: NextRequest) {
  await connectDB();
  try {
    const { _id, updateData } = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      new ObjectId(_id),
      updateData,
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return NextResponse.json({
        success: false,
        message: "Product not found.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

// Function to handle DELETE requests
export async function DELETE(req: NextRequest) {
  await connectDB();
  try {
    const { _id } = await req.json();

    const deletedProduct = await Product.findByIdAndDelete(new ObjectId(_id));

    if (!deletedProduct) {
      return NextResponse.json({
        success: false,
        message: "Product not found.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
