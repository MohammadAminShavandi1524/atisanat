import { NextResponse } from "next/server";

interface RouteProps {
  params: Promise<{
    chart_id: string;
  }>;
}

export async function GET(req: Request, { params }: RouteProps) {
  try {
    const { chart_id } = await params;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chart/child/get_by_parent/${chart_id}/`,
      {
        next: {
          revalidate: 600,
        },
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
    console.error("GET CHILD CHARTS ERROR =>", error);

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
