// /app/api/users/Info.ts
import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const _id = req.nextUrl.searchParams.get("_id");

    if (_id) {
      // Fetch single user by _id
      if (!ObjectId.isValid(_id)) {
        return NextResponse.json({
          status: 400,
          message: "Invalid user ID.",
        });
      }

      const user = await User.findById(new ObjectId(_id));
      if (!user) {
        return NextResponse.json({
          status: 404,
          message: "User not found.",
        });
      }

      return NextResponse.json({ status: 200, user }, { status: 200 });
    } else {
      // Return an error message if _id is not provided
      return NextResponse.json({
        status: 400,
        message: "User ID is required.",
      });
    }
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
