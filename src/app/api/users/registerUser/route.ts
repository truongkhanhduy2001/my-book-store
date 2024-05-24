import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/User";
import { signToken } from "@/app/utils/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, password, name } = await req.json();
    const users = await User.findOne({ email });
    if (users) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    const data = await new User({
      name: name,
      email: email,
      password: password,
    }).save();

    const id = data._id;
    const newEmail = data.email;
    const token = await signToken({ id, email: newEmail });

    return NextResponse.json({
      success: true,
      message: "Registration Successful",
      token: token,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
