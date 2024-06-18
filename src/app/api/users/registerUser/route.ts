import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/User";
import { signToken } from "@/app/utils/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, password, name } = await req.json();
    const emailToLowerCase = email.toLowerCase();
    const users = await User.findOne({ email: emailToLowerCase });
    if (users) {
      return NextResponse.json({
        status: 400,
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
      status: 200,
      message: "Registration Successful",
      token: token,
    });
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
}
