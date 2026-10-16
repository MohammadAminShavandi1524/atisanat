"use client";

import { motion } from "framer-motion";
import {
  useLocale,
  useTranslations,
} from "next-intl";

import CVResumeForm from "./cv/CVResumeForm";

const ease = [0.16, 1, 0.3, 1] as const;

const ResumePage = () => {
  const locale = useLocale();

  const t = useTranslations("Resume.cv");

  const isRTL = locale === "fa";

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background min-h-screen overflow-x-clip"
    >
      <section className="w90 py-10 sm:py-14 lg:py-20">
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
            duration: 0.7,
            ease,
          }}
        >
          <div className="mb-8 max-w-3xl sm:mb-10">
            <span className="text-custom-primary text-sm font-semibold">
              {t("eyebrow")}
            </span>

            <h1 className="text-foreground mt-3 text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl">
              {t("title")}
            </h1>

            <p className="text-muted-foreground mt-4 text-sm leading-7 sm:text-base sm:leading-8">
              {t("description")}
            </p>
          </div>

          <CVResumeForm />
        </motion.div>
      </section>
    </main>
  );
};

export default ResumePage;