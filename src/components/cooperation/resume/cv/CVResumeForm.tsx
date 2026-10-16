"use client";

import { useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowLeft, ArrowRight, LoaderCircle } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";

import { type FieldErrors, useForm } from "react-hook-form";

import { useCustomToast } from "@/components/ui/custom-toast";

import { createCVResume } from "./cv-resume.api";

import { cvResumeDefaultValues } from "./cv-resume.defaults";

import { mapCVResumeToRequest } from "./cv-resume.mapper";

import { createCVResumeSchema } from "./cv-resume.schema";

import type { CVResumeFormValues } from "./cv-resume.types";

import type { ResumeLocale } from "./data/iran-locations";

import CloseContactsSection from "./sections/CloseContactsSection";
import ContactInfoSection from "./sections/ContactInfoSection";
import EducationSection from "./sections/EducationSection";
import EmploymentSection from "./sections/EmploymentSection";
import LanguagesSection from "./sections/LanguagesSection";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import WorkExperienceSection from "./sections/WorkExperienceSection";

const CVResumeForm = () => {
  const locale = useLocale();

  const t = useTranslations("Resume.cv");

  const toast = useCustomToast();

  const lang: ResumeLocale = locale === "fa" ? "fa" : "en";

  const isRTL = lang === "fa";

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const schema = useMemo(
    () =>
      createCVResumeSchema({
        required: t("validation.required"),

        emailInvalid: t("validation.emailInvalid"),

        phoneInvalid: t("validation.phoneInvalid"),

        nationalCodeInvalid: t("validation.nationalCodeInvalid"),

        numberInvalid: t("validation.numberInvalid"),

        exemptReasonRequired: t("validation.exemptReasonRequired"),

        educationRequired: t("validation.educationRequired"),

        languageRequired: t("validation.languageRequired"),

        booleanRequired: t("validation.booleanRequired"),

        childrenRequired: t("validation.childrenRequired"),

        invalidDateRange: t("validation.invalidDateRange"),
      }),
    [t],
  );

  const form = useForm<CVResumeFormValues>({
    resolver: zodResolver(schema),

    defaultValues: cvResumeDefaultValues,

    mode: "onSubmit",

    reValidateMode: "onChange",

    shouldFocusError: true,
  });

  const {
    handleSubmit,
    reset,

    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CVResumeFormValues) => {
    try {
      const requestData = mapCVResumeToRequest(values);

      await createCVResume(requestData);

      reset(cvResumeDefaultValues);

      toast.success(t("toast.success"));

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error("CREATE CV RESUME ERROR:", error);

      toast.error(t("toast.error"));
    }
  };

  const onInvalid = (errors: FieldErrors<CVResumeFormValues>) => {
    // console.error(
    //   "CV FORM VALIDATION ERRORS:",
    //   errors,
    // );

    toast.error(t("validation.formInvalid"));

    requestAnimationFrame(() => {
      const invalid = document.querySelector<HTMLElement>(
        '[aria-invalid="true"]',
      );

      invalid?.scrollIntoView({
        behavior: "smooth",

        block: "center",
      });
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="space-y-6 sm:space-y-8"
    >
      <PersonalInfoSection form={form} locale={lang} t={t} />

      <ContactInfoSection form={form} locale={lang} t={t} />

      <EducationSection form={form} t={t} />

      <LanguagesSection form={form} locale={lang} t={t} />

      <WorkExperienceSection form={form} t={t} />

      <EmploymentSection form={form} locale={lang} t={t} />

      <CloseContactsSection form={form} t={t} />

      <div className="border-border bg-background sticky bottom-3 z-20 flex justify-end rounded-2xl border p-3 shadow-lg sm:p-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-custom-primary text-primary-foreground inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-7 text-[15px] font-medium transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          <span>
            {isSubmitting ? t("submit.submitting") : t("submit.button")}
          </span>
        </button>
      </div>
    </form>
  );
};

export default CVResumeForm;
