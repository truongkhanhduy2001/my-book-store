import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { UploadImage } from "@/app/lib/uploadImg";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const data = await req.formData();
    const image = data.get("file") as File;
    const upload: any = await UploadImage(image);
    const name = data.get("name")?.toString();
    const author = data.get("author")?.toString();
    const genre = data.get("genre")?.toString();
    const description = data.get("description")?.toString();
    const time = data.get("time")?.toString();
    const price = parseFloat(data.get("price")?.toString() || "0");
    const discount = parseFloat(data.get("discount")?.toString() || "0");
    const year = parseInt(data.get("year")?.toString() || "0");
    const stock = parseInt(data.get("stock")?.toString() || "0");
    const language = data.get("language")?.toString();
    const pageCount = parseInt(data.get("pageCount")?.toString() || "0", 10);
    const isBestSeller = data.get("isBestSeller")?.toString() === "true";
    const isNewArrival = data.get("isNewArrival")?.toString() === "true";
    const isDiscount = data.get("isDiscount")?.toString() === "true";

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
    const existingProduct = await Product.findOne({ image: upload.secure_url });
    if (existingProduct) {
      return NextResponse.json({
        success: false,
        message: "A product with the same image already exists.",
      });
    }

    const product = new Product({
      image: upload.secure_url, // Assuming the upload function returns a secure_url
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
    const _id = req.nextUrl.searchParams.get("id");
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
    const data = await req.formData();
    const _id = req.nextUrl.searchParams.get("id");

    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    const updateData: any = {};
    const image = data.get("file") as File;

    if (image) {
      const upload: any = await UploadImage(image);
      updateData.image = upload.secure_url; // Assuming the upload function returns a secure_url
    }

    const fields = [
      "name",
      "author",
      "genre",
      "description",
      "time",
      "price",
      "discount",
      "year",
      "stock",
      "language",
      "pageCount",
      "isBestSeller",
      "isNewArrival",
      "isDiscount",
    ];

    fields.forEach((field) => {
      const value = data.get(field);
      if (value !== null) {
        updateData[field] = value.toString();
      }
    });

    // Validate field formats
    if (
      parseFloat(updateData.price) < 0 ||
      parseInt(updateData.year) < 1000 ||
      parseInt(updateData.year) > new Date().getFullYear() ||
      parseInt(updateData.stock) < 0 ||
      parseInt(updateData.pageCount) < 1
    ) {
      return NextResponse.json({
        success: false,
        message: "Invalid values provided.",
      });
    }

    if (parseFloat(updateData.discount) >= parseFloat(updateData.price)) {
      return NextResponse.json({
        success: false,
        message: "Discount price must be less than the original price.",
      });
    }

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
    console.error("Error updating product:", err); // Log the error for debugging
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
