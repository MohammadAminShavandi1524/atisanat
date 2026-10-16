import {
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import {
  NextRequest,
  NextResponse,
} from "next/server";

import { randomUUID } from "crypto";

export const runtime =
  "nodejs";

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

const getS3Client = () => {
  const endpoint =
    process.env.ARVAN_ENDPOINT;

  const region =
    process.env.ARVAN_REGION;

  const accessKeyId =
    process.env.ARVAN_ACCESS_KEY;

  const secretAccessKey =
    process.env.ARVAN_SECRET_KEY;

  if (
    !endpoint ||
    !region ||
    !accessKeyId ||
    !secretAccessKey
  ) {
    throw new Error(
      "Arvan storage configuration is incomplete.",
    );
  }

  return new S3Client({
    endpoint,
    region,

    credentials: {
      accessKeyId,
      secretAccessKey,
    },

    forcePathStyle: false,
  });
};

const getPublicUrl = (
  key: string,
) => {
  const publicBaseUrl =
    process.env.ARVAN_PUBLIC_URL?.replace(
      /\/+$/,
      "",
    );

  if (publicBaseUrl) {
    return `${publicBaseUrl}/${key}`;
  }

  const endpoint =
    process.env.ARVAN_ENDPOINT?.replace(
      /\/+$/,
      "",
    );

  const bucket =
    process.env.ARVAN_BUCKET;

  if (
    !endpoint ||
    !bucket
  ) {
    throw new Error(
      "Unable to create resume public URL.",
    );
  }

  return `${endpoint}/${bucket}/${key}`;
};

export async function POST(
  request: NextRequest,
) {
  try {
    const formData =
      await request.formData();

    const file =
      formData.get("file");

    if (
      !(file instanceof File)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Resume file is required.",
        },
        {
          status: 400,
        },
      );
    }

    const isPdf =
      file.type ===
        "application/pdf" ||
      file.name
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPdf) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only PDF files are allowed.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "PDF file must be smaller than 10 MB.",
        },
        {
          status: 400,
        },
      );
    }

    const bucket =
      process.env.ARVAN_BUCKET;

    if (!bucket) {
      throw new Error(
        "ARVAN_BUCKET is not configured.",
      );
    }

    const buffer =
      Buffer.from(
        await file.arrayBuffer(),
      );

    const key =
      `resumes/${Date.now()}-${randomUUID()}.pdf`;

    const s3 =
      getS3Client();

    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,

        Body: buffer,

        ContentType:
          "application/pdf",

        ContentDisposition:
          "inline",
      }),
    );

    const url =
      getPublicUrl(key);

    return NextResponse.json(
      {
        success: true,
        url,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "RESUME PDF UPLOAD ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Resume upload failed.",
      },
      {
        status: 500,
      },
    );
  }
}
