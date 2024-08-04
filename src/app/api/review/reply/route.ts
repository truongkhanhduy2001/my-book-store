import connectDB from "@/app/lib/connectDB";
import Review from "@/app/models/Review";
import User from "@/app/models/User";
import { NextResponse, NextRequest } from "next/server";

export const revalidate = 0;

const MAX_REPLY_LENGTH = 1000; // Giới hạn độ dài reply

// Hàm đơn giản để loại bỏ các ký tự đặc biệt và HTML tags
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>&'"]/g, (char) => {
      switch (char) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "&":
          return "&amp;";
        case "'":
          return "&#39;";
        case '"':
          return "&quot;";
        default:
          return char;
      }
    })
    .trim();
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { reviewId, userId, content } = await req.json();

    if (!reviewId || !userId || !content) {
      return NextResponse.json({
        status: 400,
        error: "Review ID, User ID, and content are required",
      });
    }

    const [review, user] = await Promise.all([
      Review.findById(reviewId),
      User.findById(userId),
    ]);

    if (!review) {
      return NextResponse.json({ status: 404, error: "Review not found" });
    }

    if (!user) {
      return NextResponse.json({ status: 404, error: "User not found" });
    }

    const sanitizedContent = sanitizeInput(content);

    if (sanitizedContent.length > MAX_REPLY_LENGTH) {
      return NextResponse.json({
        status: 400,
        error: `Reply content must not exceed ${MAX_REPLY_LENGTH} characters`,
      });
    }

    if (sanitizedContent.length === 0) {
      return NextResponse.json({
        status: 400,
        error: "Reply content cannot be empty after sanitization",
      });
    }

    const newReply = {
      userId: user._id,
      content: sanitizedContent,
      createdAt: new Date(),
    };

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $push: { replies: newReply } },
      { new: true }
    ).populate({
      path: "replies.userId",
      select: "name",
    });

    // Trả về chỉ 10 replies mới nhất
    const latestReplies = updatedReview.replies.slice(-10);

    return NextResponse.json({ status: 200, replies: latestReplies });
  } catch (error) {
    console.error("Error in reply API:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
