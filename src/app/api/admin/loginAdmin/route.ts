import connectDB from "@/app/lib/connectDB";
import Admin from "@/app/models/Admin";
import { NextResponse, NextRequest } from "next/server";
import { signToken } from "@/app/utils/jwt";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { name, password } = await req.json();
    const admin = await Admin.findOne({ name });

    if (admin) {
      if (password === admin.password) {
        // Note: In production, use a secure password comparison like bcrypt
        if (admin.role === "admin") {
          const id = admin._id;
          const token = await signToken({ id, name, role: admin.role });
          return NextResponse.json({
            success: true,
            message: "Admin Login Successful",
            token: token,
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "Access denied. Not an admin.",
          });
        }
      }

      return NextResponse.json({
        success: false,
        message: "The email or password is incorrect.",
      });
    }

    return NextResponse.json({
      success: false,
      message: "The email or password is incorrect.",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
