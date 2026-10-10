import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ lang: string }>;
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { lang } = await params;

    if (lang !== "en" && lang !== "fa") {
      return NextResponse.json(
        { message: "Unsupported language" },
        { status: 400 },
      );
    }

    const body = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/resume/dynamic/answer/create/${lang}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await response.json().catch(() => null);

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("CREATE DYNAMIC RESUME ANSWER ERROR:", error);

    return NextResponse.json(
      { message: "Failed to submit resume answers" },
      { status: 502 },
    );
  }
}
