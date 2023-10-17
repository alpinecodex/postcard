type Postcard = {
  email: string;
  message: string;
};

import { NextResponse } from "next/server";
import { Prediction } from "replicate";
import redis from "@/lib/redis";
import resend from "@/lib/resend";
import { EmailTemplate } from "@/components/email";

export async function POST(request: Request) {
  const body: Prediction = await request.json();
  console.log("body: ", body);
  const postcard = (await redis?.hgetall(body?.id)) as Postcard;

  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [postcard?.email],
    subject: "AI POSTCARD!!!",
    react: EmailTemplate({
      message: postcard?.message,
      image: body?.output,
    }) as React.ReactElement,
  });
  console.log(postcard);
  return NextResponse.json(data);
}
