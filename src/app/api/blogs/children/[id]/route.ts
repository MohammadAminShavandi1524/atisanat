import { NextResponse } from "next/server";

interface RouteProps {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: Request, { params }: RouteProps) {
  try {
    const { id } = await params;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/get_blogs/child/${id}/`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, {
        status: res.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("FETCH CHILD BLOGS ERROR =>", error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
