import connectDB from "@/app/lib/connectDB";
import Admin from "@/app/models/Admin";
import { NextResponse, NextRequest } from "next/server";
import { signToken } from "@/app/utils/jwt";

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
              status: 200,
              message: "Admin Login Successful",
              token: token,
            });
          } else {
            return NextResponse.json({
              status: 403,
              message: "Access denied. Not an admin.",
            });
          }
        }

        return NextResponse.json({
          status: 401,
          message: "The name or password is incorrect.",
        });
      }
      return NextResponse.json({
        status: 401,
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
    return NextResponse.json({ status: 500, error: err.message });
  }
}
