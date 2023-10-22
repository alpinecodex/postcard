# AI Postcard Sender

Send AI email Postcards!

<img width="575" alt="form" src="https://github.com/alpinecodex/postcard/assets/95453018/36e575c0-67b7-455d-bb1e-c92a0c3248a3">
<img width="938" alt="email" src="https://github.com/alpinecodex/postcard/assets/95453018/abfcc767-d6d5-4241-8446-0c0c05382014">

This app uses the [Next.js 13 App Router](https://nextjs.org/) (hosted on [Vercel](https://vercel.com/)), [Upstash QStash](https://upstash.com/docs/qstash/overall/getstarted) for task scheduling, [Upstash Redis](https://upstash.com/docs/redis/overall/getstarted) for cache, [Replicate AI](https://replicate.com/) for [SDXL](https://stablediffusionxl.com/) image generation, and [Resend](https://resend.com/) for HTTP email sending.

## App Architecture

1. A user fills out a form with an email address for the recipient, a body message for the email, a prompt for the image, and sets a date and a time of day to send the postcard.
2. We handle the form submission on an API route and publish a message to QStash.
3. When the specified time approaches, QStash sends the message to another API route in our app. This API route catches the message from QStash, sends a request to Replicate to generate the image, and caches the ID of the Replicate generation in Redis with our email information.
4. Once the image is finished generating, Replicate sends a webhook to another API route in our app. This route catches the webhook and retrieves the cached information from Redis by the Replicate generation ID. This key value pair includes all necessary info for the email. We then send an email using Resend to the postcard recipient with the image attached.

![architecture](https://github.com/alpinecodex/postcard/assets/95453018/be2a444a-5d29-4b4f-bc0c-0563fff71cd9)

## Project Setup

Clone this repository and install all dependencies:
```
git clone https://github.com/alpinecodex/postcard.git
cd postcard
npm install
```

Deploy the project to Vercel!

## Environment Variable Configuration

Clone `.env.example` file in the root of the project and rename it `.env`. Go ahead and add the following variables:

```
REPLICATE_API_TOKEN=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

QSTASH_URL=
QSTASH_TOKEN=

RESEND_API_KEY=

# Your app domain on Vercel
APP_DOMAIN=
```

[Resend API key](https://resend.com/docs/api-reference/api-keys/create-api-key)
[Replicate API key](https://replicate.com/docs/reference/http#authentication)
[Upstash Redis Token & URL](https://upstash.com/docs/redis/overall/getstarted)
[Upstash QStash Token & URL](https://upstash.com/docs/qstash/overall/getstarted)
