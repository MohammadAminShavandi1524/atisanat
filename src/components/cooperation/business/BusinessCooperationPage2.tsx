"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import BusinessCooperationForm2 from "./BusinessCooperationForm2";

const ease = [0.16, 1, 0.3, 1] as const;

const BusinessCooperationPage2 = () => {
  const locale = useLocale();
  const t = useTranslations("BusinessCooperation");

  const isRTL = locale === "fa";

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background min-h-screen overflow-hidden"
    >
      <section className="w90 py-20">
        {/* Intro */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            ease,
          }}
          className="mb-14 max-w-3xl"
        >
          <h1 className="text-foreground text-[48px] leading-[1.15] font-semibold">
            {t("title")}
          </h1>

          <p className="text-muted-foreground mt-5 max-w-2xl text-[16px] leading-8">
            {t("description")}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.08,
            ease,
          }}
        >
          <BusinessCooperationForm2 />
        </motion.div>
      </section>
    </main>
  );
};

export default BusinessCooperationPage2;
