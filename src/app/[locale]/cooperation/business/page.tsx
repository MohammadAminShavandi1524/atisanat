import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import BusinessCooperationPage from "@/components/cooperation/business/BusinessCooperationPage";
import BusinessCooperationPage2 from "@/components/cooperation/business/BusinessCooperationPage2";

interface BusinessCooperationRouteProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function BusinessCooperationRoute({
  params,
}: BusinessCooperationRouteProps) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      <BusinessCooperationPage />
      <BusinessCooperationPage2 />
    </>
  );
}
