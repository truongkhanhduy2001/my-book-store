// /app/api/admin/users.ts
import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";
import { ObjectId } from "mongodb";

// Function to handle GET requests to list users or get a single user by _id
export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const _id = req.nextUrl.searchParams.get("_id");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10", 10); // Default to 10 for admin pages

    if (_id) {
      // Fetch single user by _id
      if (!ObjectId.isValid(_id)) {
        return NextResponse.json({
          success: false,
          message: "Invalid user ID.",
        });
      }

      const user = await User.findById(new ObjectId(_id));
      if (!user) {
        return NextResponse.json({
          success: false,
          message: "User not found.",
        });
      }

      return NextResponse.json({ success: true, user });
    } else {
      // Fetch paginated list of users
      const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit);
      const totalUsers = await User.countDocuments();

      return NextResponse.json({
        success: true,
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}

// Function to handle DELETE requests to delete a user by _id
export async function DELETE(req: NextRequest) {
  await connectDB();
  try {
    const { _id } = await req.json();

    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const deletedUser = await User.findByIdAndDelete(new ObjectId(_id));

    if (!deletedUser) {
      return NextResponse.json({
        success: false,
        message: "User not found.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
