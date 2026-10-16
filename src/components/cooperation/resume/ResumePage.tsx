"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import CVResumeForm from "./cv/CVResumeForm";

const ease = [0.16, 1, 0.3, 1] as const;

const relatedFields = [
  "machineTools",
  "molding",
  "mechanics",
  "solidDesign",
  "technicalVocational",
  "precisionTurning",
  "precisionMilling",
] as const;

const ResumePage = () => {
  const locale = useLocale();

  const t = useTranslations("Resume.cv");

  const isRTL = locale === "fa";

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background min-h-screen overflow-x-clip"
    >
      <section className="w90 py-7 s:py-10 sm:py-12 lg:py-16">
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
          <div className="mb-7 s:mb-8 sm:mb-10">
            <div className="px-0 s:px-1">
              <h1 className="text-foreground mt-2 text-[1.4rem] leading-tight font-semibold s:mt-3 s:text-2xl sm:text-3xl lg:text-4xl">
                {t("title")}
              </h1>

              <p className="text-muted-foreground mt-3 max-w-3xl text-[13px] leading-6 s:text-sm s:leading-7 sm:text-base sm:leading-8">
                {t("description")}
              </p>
            </div>

            <div className="relative mt-5 border-0 bg-transparent p-0 s:mt-6 s:overflow-hidden s:rounded-2xl s:border s:border-border s:bg-secondary-bg/35 s:p-4 sm:p-5 lg:p-6">
              <div
                aria-hidden="true"
                className="bg-custom-primary absolute inset-y-0 start-0 hidden w-[3px] s:block"
              />

              <div className="flex items-start">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-foreground text-[15px] font-semibold sm:text-base">
                      {t("relatedFields.title")}
                    </h2>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5 s:mt-4 s:gap-2">
                    {relatedFields.map((item) => (
                      <span
                        key={item}
                        className="border-border bg-background text-foreground inline-flex min-h-8 items-center justify-center rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors s:min-h-9 s:px-3.5 s:py-2 s:text-[13px] sm:text-sm"
                      >
                        {t(`relatedFields.items.${item}`)}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted-foreground mt-3 text-xs leading-6 s:mt-4 sm:text-[13px]">
                    {t("relatedFields.note")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CVResumeForm />
        </motion.div>
      </section>
    </main>
  );
};

export default ResumePage;
