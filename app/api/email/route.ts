type Postcard = {
  email: string;
  message: string;
};

import { NextResponse } from "next/server";
import { Prediction } from "replicate";
import redis from "@/lib/redis";

export async function POST(request: Request) {
  const body: Prediction = await request.json();
  const postcard = (await redis?.hgetall(body?.id)) as Postcard;
  console.log(postcard);
  return NextResponse.json(postcard);
}
