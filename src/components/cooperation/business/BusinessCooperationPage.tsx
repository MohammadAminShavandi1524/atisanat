"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import BusinessCooperationForm from "./BusinessCooperationForm";

const ease = [0.16, 1, 0.3, 1] as const;

const BusinessCooperationPage = () => {
  const locale = useLocale();
  const t = useTranslations("BusinessCooperation");

  const isRTL = locale === "fa";

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background min-h-screen overflow-hidden"
    >
      <section className="w90 py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 28,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="border-border grid grid-cols-[0.72fr_1.28fr] overflow-hidden rounded-2xl border"
        >
          {/* Intro */}
          <div className="bg-secondary-bg relative flex min-h-[650px] flex-col justify-between p-12">
            <div>
              <h1 className="text-foreground max-w-md text-[50px] leading-[1.1] font-semibold">
                {t("title")}
              </h1>

              <p className="text-muted-foreground mt-6 max-w-md text-[16px] leading-8">
                {t("description")}
              </p>
            </div>

            <div className="bg-custom-primary/8 pointer-events-none absolute -start-24 -bottom-24 size-[320px] rounded-full blur-[110px]" />
          </div>

          {/* Form */}
          <div className="border-border min-w-0 border-s p-12">
            <BusinessCooperationForm />
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default BusinessCooperationPage;
