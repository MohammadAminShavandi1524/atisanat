import { getTranslations } from "next-intl/server";

import NotFound from "@/components/ui/404-page-not-found";

export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <NotFound
      title={t("title")}
      description={t("description")}
      homeLabel={t("home")}
      homeHref="/"
    />
  );
}