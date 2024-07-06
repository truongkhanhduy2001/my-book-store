import connectDB from "@/app/lib/connectDB";
import Product from "@/app/models/Product";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const query = req.nextUrl.searchParams.get("query");

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Query parameter is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const regexQuery = { $regex: query, $options: "i" };

    const products = await Product.find({
      $or: [
        { name: regexQuery },
        { genre: regexQuery }, // This will match if the genre contains the query
        { author: regexQuery }
      ],
    });

    return NextResponse.json(products);
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching products" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
