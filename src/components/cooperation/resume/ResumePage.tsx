"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ClipboardList, FileUp } from "lucide-react";

import ResumeForm from "./ResumeForm";
import DynamicResumeForm from "./DynamicResumeForm";

const ease = [0.16, 1, 0.3, 1] as const;

type ResumeMethod = "file" | "questions";

const fieldKeys = [
  "machineTools",
  "moldMaking",
  "mechanicalEngineering",
  "solidMechanicsDesign",
  "technicalVocational",
  "precisionTurning",
  "precisionMilling",
] as const;

const ResumePage = () => {
  const locale = useLocale();
  const t = useTranslations("Resume");

  const isRTL = locale === "fa";

  const [method, setMethod] = useState<ResumeMethod>("questions");

  const isFileMethod = method === "file";

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-background min-h-screen overflow-hidden"
    >
      <section className="w90 py-20">
        {/* Resume Method Selector */}
        <div className="mb-8">
          <h2 className="text-foreground text-2xl font-semibold sm:text-3xl">
            {t("method.title")}
          </h2>

          <p className="text-muted-foreground mt-3 text-sm leading-7 sm:text-base">
            {t("method.description")}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Upload PDF */}
            <button
              type="button"
              aria-pressed={isFileMethod}
              onClick={() => setMethod("file")}
              className={`flex min-w-0 cursor-pointer items-start gap-4 rounded-xl border p-5 text-start transition-colors duration-300 sm:p-6 ${
                isFileMethod
                  ? "border-custom-primary bg-secondary-bg"
                  : "border-border bg-background hover:bg-secondary-bg/50"
              }`}
            >
              <span className="border-border bg-background text-custom-primary flex size-12 shrink-0 items-center justify-center rounded-xl border">
                <FileUp size={23} strokeWidth={1.8} />
              </span>

              <span className="min-w-0">
                <span className="text-foreground block text-base font-semibold sm:text-lg">
                  {t("method.file.title")}
                </span>

                <span className="text-muted-foreground mt-2 block text-sm leading-6">
                  {t("method.file.description")}
                </span>
              </span>
            </button>

            {/* Answer Questions */}
            <button
              type="button"
              aria-pressed={!isFileMethod}
              onClick={() => setMethod("questions")}
              className={`flex min-w-0 cursor-pointer items-start gap-4 rounded-xl border p-5 text-start transition-colors duration-300 sm:p-6 ${
                !isFileMethod
                  ? "border-custom-primary bg-secondary-bg"
                  : "border-border bg-background hover:bg-secondary-bg/50"
              }`}
            >
              <span className="border-border bg-background text-custom-primary flex size-12 shrink-0 items-center justify-center rounded-xl border">
                <ClipboardList size={23} strokeWidth={1.8} />
              </span>

              <span className="min-w-0">
                <span className="text-foreground block text-base font-semibold sm:text-lg">
                  {t("method.questions.title")}
                </span>

                <span className="text-muted-foreground mt-2 block text-sm leading-6">
                  {t("method.questions.description")}
                </span>
              </span>
            </button>
          </div>
        </div>

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
          className={`border-border grid grid-cols-1 overflow-hidden rounded-2xl border ${
            isFileMethod ? "lg:grid-cols-[0.72fr_1.28fr]" : ""
          }`}
        >
          {/* Intro — only for PDF upload */}
          {isFileMethod && (
            <div className="bg-secondary-bg relative flex flex-col justify-between overflow-hidden p-6 sm:p-8 lg:p-12">
              <div className="relative z-10">
                <h1 className="text-foreground max-w-md text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-[50px]">
                  {isFileMethod ? t("title") : t("dynamic.title")}
                </h1>

                <p className="text-muted-foreground mt-6 max-w-md text-sm leading-7 sm:text-base sm:leading-8">
                  {isFileMethod ? t("description") : t("dynamic.description")}
                </p>

                {isFileMethod && (
                  <div className="border-border mt-8 border-t pt-6 sm:mt-10 sm:pt-8">
                    <h2 className="text-foreground text-lg font-semibold sm:text-xl">
                      {t("fields.title")}
                    </h2>

                    <ul className="mt-5 flex flex-wrap gap-3">
                      {fieldKeys.map((field) => (
                        <li
                          key={field}
                          className="border-border bg-background/70 text-foreground rounded-lg border px-4 py-2.5 text-sm leading-6"
                        >
                          {t(`fields.${field}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bg-custom-primary/8 pointer-events-none absolute -start-24 -bottom-24 size-[320px] rounded-full blur-[110px]" />
            </div>
          )}

          {/* Separate Forms */}
          <div
            className={`min-w-0 p-5 sm:p-8 lg:p-12 ${
              isFileMethod
                ? "border-border border-t lg:border-s lg:border-t-0"
                : ""
            }`}
          >
            {isFileMethod ? <ResumeForm /> : <DynamicResumeForm />}
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ResumePage;
