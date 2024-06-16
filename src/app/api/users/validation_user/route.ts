import connectDB from "@/app/lib/connectDB";
import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "@/app/utils/jwt";

export async function POST(req: NextRequest) {
  await connectDB();

  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "No token provided" });
  }

  try {
    const decoded: any = await jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "Invalid token", status: 401 });
    }

    return NextResponse.json({ data: user, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" });
  }
}
