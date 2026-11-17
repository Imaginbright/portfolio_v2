import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
});

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = newsletterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid newsletter details." },
      { status: 400 },
    );
  }

  const apiKey = process.env.KIT_API_KEY;

  if (!apiKey) {
    console.error("KIT_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Newsletter service is not configured." },
      { status: 500 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const name = parsed.data.name;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Kit-Api-Key": apiKey,
  };

  try {
    const subscriberResponse = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers,
      body: JSON.stringify({
        email_address: email,
        first_name: name,
      }),
    });

    if (!subscriberResponse.ok) {
      const details = await subscriberResponse.text();
      console.error("Kit subscriber creation failed.", {
        status: subscriberResponse.status,
        details,
      });

      return NextResponse.json(
        { error: "Unable to subscribe right now. Please try again." },
        { status: 502 },
      );
    }

    const tagId = process.env.KIT_BLOG_TAG_ID;

    if (tagId) {
      try {
        const tagResponse = await fetch(
          `https://api.kit.com/v4/tags/${encodeURIComponent(tagId)}/subscribers`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({ email_address: email }),
          },
        );

        if (!tagResponse.ok) {
          const details = await tagResponse.text();
          console.warn("Kit subscriber tagging failed.", {
            status: tagResponse.status,
            details,
          });
        }
      } catch (error) {
        console.warn("Kit subscriber tagging request failed.", error);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Kit subscriber request failed.", error);
    return NextResponse.json(
      { error: "Unable to subscribe right now. Please try again." },
      { status: 502 },
    );
  }
}
