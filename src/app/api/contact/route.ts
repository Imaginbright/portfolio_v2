import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, projectType, projectDetails } =
      await req.json();

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["brightified2004@gmail.com"],
      subject: `New Project: ${projectType}`,
      replyTo: email,
      text: `From: ${firstName} ${lastName}\nEmail: ${email}\nProject Type: ${projectType}\n\nDetails:\n${projectDetails}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
