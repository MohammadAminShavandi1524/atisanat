import { NextResponse } from "next/server";

export async function GET() {
  console.log("[RESUME QUESTIONS] Route handler reached");

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const url = `${baseUrl?.replace(/\/+$/, "")}/resume/dynamic/question/get/`;

    console.log("[RESUME QUESTIONS] Backend URL:", url);

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type");
    const rawBody = await response.text();

    console.log("[RESUME QUESTIONS] Backend status:", response.status);
    console.log("[RESUME QUESTIONS] Content-Type:", contentType);
    console.log("[RESUME QUESTIONS] Response body:", rawBody.slice(0, 1000));

    let data: unknown;

    try {
      data = JSON.parse(rawBody);
    } catch {
      console.error(
        "[RESUME QUESTIONS] Backend returned invalid JSON:",
        rawBody.slice(0, 1000),
      );

      return NextResponse.json(
        {
          message: "Backend returned a non-JSON response",
          backendStatus: response.status,
          backendBody: rawBody.slice(0, 500),
        },
        { status: 502 },
      );
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("[RESUME QUESTIONS] Fetch failed:", error);

    return NextResponse.json(
      { message: "Failed to get resume questions" },
      { status: 502 },
    );
  }
}
