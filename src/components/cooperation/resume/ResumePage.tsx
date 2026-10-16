"use client";

import { motion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
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
      <section className="w90 py-10 sm:py-12 lg:py-16">
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
          <div className="mb-8 sm:mb-10">
            <div className="px-1">
              <h1 className="text-foreground mt-3 text-2xl leading-tight font-semibold sm:text-3xl lg:text-4xl">
                {t("title")}
              </h1>

              <p className="text-muted-foreground mt-3 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8">
                {t("description")}
              </p>
            </div>

            <div className="border-border bg-secondary-bg/35 relative mt-6 overflow-hidden rounded-2xl border p-4 sm:p-5 lg:p-6">
              <div
                aria-hidden="true"
                className="bg-custom-primary absolute inset-y-0 start-0 w-[3px]"
              />

              <div className="flex items-start ">
                

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="text-foreground text-[15px] font-semibold sm:text-base">
                      {t("relatedFields.title")}
                    </h2>

                   
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {relatedFields.map((item) => (
                      <span
                        key={item}
                        className="border-border bg-background text-foreground inline-flex min-h-9 items-center justify-center rounded-lg border px-3.5 py-2 text-[13px] font-medium transition-colors sm:text-sm font-semibold"
                      >
                        {t(`relatedFields.items.${item}`)}
                      </span>
                    ))}
                  </div>

                  <p className="text-muted-foreground mt-4 text-xs leading-6 sm:text-[13px]">
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
