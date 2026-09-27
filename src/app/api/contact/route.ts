import { Resend } from "resend";
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";
export async function POST(req: Request) {
  try {
    const parsed = contactSchema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 },
      );
    if (!process.env.RESEND_API_KEY)
      return NextResponse.json(
        { success: false, error: "Contact service unavailable" },
        { status: 503 },
      );
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { firstName, lastName, email, projectType, projectDetails } =
      parsed.data;
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["brightified2004@gmail.com"],
      subject: "New Project: " + projectType,
      replyTo: email,
      text:
        "From: " +
        firstName +
        " " +
        lastName +
        "\nEmail: " +
        email +
        "\nProject Type: " +
        projectType +
        "\n\nDetails:\n" +
        projectDetails,
    });
    if (error)
      return NextResponse.json(
        { success: false, error: "Unable to send message" },
        { status: 502 },
      );
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to send message" },
      { status: 500 },
    );
  }
}
