type RequestBody = {
  email: string;
  prompt: string;
  message: string;
  timestamp: number;
};

import { Client } from "@upstash/qstash";
import { NextResponse } from "next/server";

const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN || "",
});

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const host = request.headers.get("host");

  const qstashResponse = await qstashClient.publishJSON({
    url: `https://${host}/api/ai`,
    body: body,
    notBefore: body?.timestamp,
  });

  return NextResponse.json(qstashResponse);
}
