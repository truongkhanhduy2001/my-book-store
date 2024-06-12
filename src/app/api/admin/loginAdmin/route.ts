import connectDB from "@/app/lib/connectDB";
import Admin from "@/app/models/Admin";
import { NextResponse, NextRequest } from "next/server";
import { signToken } from "@/app/utils/jwt";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const existingAdmin = await Admin.findOne({ role: "admin" });

    if (existingAdmin) {
      const { name, password } = await req.json();

      const admin = await Admin.findOne({ name });

      if (admin) {
        if (admin.password == password) {
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
          message: "The name or password is incorrect.",
        });
      }
      return NextResponse.json({
        success: false,
        message: "The name or password is incorrect.",
      });
    } else {
      await new Admin({
        name: "admin",
        password: "123456", // It's recommended to hash the password before saving
        role: "admin",
      }).save();
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
