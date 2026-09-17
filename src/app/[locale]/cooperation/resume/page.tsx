import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import ResumePage from "@/components/cooperation/resume/ResumePage";

interface ResumeRouteProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function ResumeRoute({ params }: ResumeRouteProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ResumePage />;
}
