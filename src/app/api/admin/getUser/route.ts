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
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = Number.MAX_SAFE_INTEGER;

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
          status: 400,
          message: "User not found.",
        });
      }

      return NextResponse.json({ status: 200, user });
    } else {
      // Fetch paginated list of users
      const users = await User.find()
        .skip((page - 1) * limit)
        .limit(limit);
      const totalUsers = await User.countDocuments();

      return NextResponse.json({
        status: 200,
        users,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page,
      });
    }
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}

// Function to handle POST requests to lock a user account
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { _id, action } = await req.json();

    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json({
        status: 400,
        message: "Invalid user ID.",
      });
    }

    let update;
    if (action === "lock") {
      update = { locked: true };
    } else if (action === "unlock") {
      update = { locked: false };
    } else {
      return NextResponse.json({
        status: 400,
        message: "Invalid action.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      new ObjectId(_id),
      update,
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({
        status: 400,
        message: "User not found.",
      });
    }

    return NextResponse.json({
      status: 200,
      message: `User ${action}ed successfully`,
      user: updatedUser,
    });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
