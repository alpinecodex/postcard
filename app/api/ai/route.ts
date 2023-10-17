type RequestBody = {
  email: string;
  prompt: string;
  message: string;
  timestamp: number;
};

import { NextResponse } from "next/server";
import Replicate from "replicate";
import redis from "@/lib/redis";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const output = await replicate.predictions.create({
      version:
        "563a66acc0b39e5308e8372bed42504731b7fec3bc21f2fcbea413398690f3ec",
      input: {
        prompt: "In the style of HISGH. " + body.prompt,
        negative_prompt:
          "Gothic, Medieval, Abstract, Futuristic, Rustic, Victorian, Graffiti, Fantasy, Horror, Industrial, Cubism, Impressionism, Surrealism, Baroque, Renaissance, Expressionism, Pop-art, Dystopian, Steampunk, Cyberpunk, Ugly, Bad proportion, Distorted, Cluttered, Chaotic, Mismatched, Overcrowded, Imbalanced, Inharmonious, Disproportionate, Unpleasant, Grungy, Messy, Unrefined, Crude, Grotesque, Disarray, Jumbled, Haphazard, Unsymmetrical",
        width: 1024,
        height: 1024,
        num_outputs: 1,
        scheduler: "K_EULER",
        num_inference_steps: 50,
        guidance_scale: 7.5,
        prompt_strength: 0.8,
        refine: "no_refiner",
        high_noise_frac: 0.8,
        apply_watermark: true,
        lora_scale: 0.6,
      },
      webhook: "https://postcard-jet.vercel.app/api/email",
    });

    console.log("output: ", output);
    console.log(output?.id);

    await redis!.hset(output?.id, body);

    return NextResponse.json(output);
  } catch (error) {
    console.log(error);
    return NextResponse.json("An error occurred. Please try again later.", {
      status: 500,
    });
  }
}
