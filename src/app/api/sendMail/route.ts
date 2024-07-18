import { NextResponse, NextRequest } from "next/server";
import nodemailer from "nodemailer";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  const { to, subject, body } = await req.json();
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  if (!SMTP_EMAIL || !SMTP_PASSWORD) {
    return new Response(
      JSON.stringify({ error: "SMTP credentials are not set" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (!to || !subject || !body) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Error sending email" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
