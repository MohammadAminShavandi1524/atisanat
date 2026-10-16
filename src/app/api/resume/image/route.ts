import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

const s3 = new S3Client({
  region: process.env.ARVAN_REGION!,

  endpoint: process.env.ARVAN_ENDPOINT!,

  forcePathStyle: true,

  credentials: {
    accessKeyId: process.env.ARVAN_ACCESS_KEY!,
    secretAccessKey: process.env.ARVAN_SECRET_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No image uploaded",
        },
        {
          status: 400,
        },
      );
    }

    const extension = allowedTypes.get(file.type);

    if (!extension) {
      return NextResponse.json(
        {
          success: false,
          message: "Unsupported image type",
        },
        {
          status: 400,
        },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is too large",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const fileName =
      `${crypto.randomUUID()}.${extension}`;

    const objectKey =
      `resumes/images/${fileName}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.ARVAN_BUCKET!,

        Key: objectKey,

        Body: buffer,

        ContentType: file.type,

        ContentDisposition: "inline",

        ACL: "public-read",
      }),
    );

    const publicBaseUrl =
      process.env.ARVAN_PUBLIC_URL ??
      `${process.env.ARVAN_ENDPOINT}/${process.env.ARVAN_BUCKET}`;

    const url =
      `${publicBaseUrl.replace(/\/+$/, "")}/${objectKey}`;

    return NextResponse.json({
      success: true,
      url,
    });
  } catch (error) {
    console.error(
      "CV IMAGE UPLOAD ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Image upload failed",
      },
      {
        status: 500,
      },
    );
  }
}