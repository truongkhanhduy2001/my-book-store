import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";
import { signToken } from "@/app/utils/jwt";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (user) {
      // Check if the account is locked
      if (user.locked) {
        return NextResponse.json({
          status: 403,
          message: "Your account is locked. Please contact support.",
        });
      }

      if (password === user.password) {
        const id = user._id;
        const token = await signToken({ id, email });
        return NextResponse.json({
          status: 200,
          message: "Login Successful",
          token: token,
        });
      }

      return NextResponse.json({
        status: 400,
        message: "The email or password is incorrect.",
      });
    }

    return NextResponse.json({
      status: 400,
      message: "The email or password is incorrect.",
    });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
