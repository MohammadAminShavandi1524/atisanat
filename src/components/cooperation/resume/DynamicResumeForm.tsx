"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, RotateCcw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCustomToast } from "@/components/ui/custom-toast";

import {
  getDynamicResumeQuestions,
  submitDynamicResumeAnswers,
  type DynamicResumeQuestion,
} from "./dynamic-resume.api";
import { FormField } from "@/components/FormField";

type DynamicResumeFormValues = Record<string, string>;

const DynamicResumeForm = () => {
  const locale = useLocale();
  const t = useTranslations("Resume.dynamic");
  const toast = useCustomToast();

  const lang = locale === "fa" ? "fa" : "en";

  const [questions, setQuestions] = useState<DynamicResumeQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = useMemo(
    () =>
      z.object(
        Object.fromEntries(
          questions.map((question) => [
            String(question.id),
            z.string().trim().min(1, t("validation.answerRequired")),
          ]),
        ) as Record<string, z.ZodString>,
      ),
    [questions, t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DynamicResumeFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    setLoadError(false);

    try {
      const data = await getDynamicResumeQuestions();

      setQuestions([...data].sort((a, b) => a.index - b.index));
    } catch (error) {
      console.error("GET DYNAMIC RESUME QUESTIONS ERROR:", error);
      setLoadError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const handleValidSubmit = async (values: DynamicResumeFormValues) => {
    setIsSubmitting(true);

    try {
      await submitDynamicResumeAnswers(lang, {
        answers: questions.map((question) => ({
          question: lang === "fa" ? question.question_fa : question.question_en,
          answer: (values[String(question.id)] ?? "").trim(),
        })),
      });

      reset({});
      toast.success(t("toast.success"));
    } catch (error) {
      console.error("SUBMIT DYNAMIC RESUME ANSWERS ERROR:", error);
      toast.error(t("toast.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInvalidSubmit = () => {
    toast.error(t("validation.allAnswersRequired"));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center gap-3">
        <LoaderCircle
          className="text-custom-primary size-5 animate-spin"
          strokeWidth={1.8}
        />

        <span className="text-muted-foreground text-sm">{t("loading")}</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
        <p className="text-muted-foreground text-sm leading-7">
          {t("loadError")}
        </p>

        <button
          type="button"
          onClick={() => void loadQuestions()}
          className="text-custom-primary mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium"
        >
          <RotateCcw size={16} strokeWidth={1.8} />
          <span>{t("retry")}</span>
        </button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-[320px] items-center justify-center text-center">
        <p className="text-muted-foreground text-sm leading-7">{t("empty")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
        {questions.map((question, index) => {
          const fieldName = String(question.id);
          const questionText =
            lang === "fa" ? question.question_fa : question.question_en;

          return (
            <FormField
              key={question.id}
              label={`${index + 1}. ${questionText}`}
              as="textarea"
              containerClassName="min-w-0"
              register={register(fieldName)}
              error={errors[fieldName]}
              dir={lang === "fa" ? "rtl" : "ltr"}
              lang={lang}
              placeholder={t("form.answerPlaceholder")}
              aria-invalid={Boolean(errors[fieldName])}
            />
          );
        })}
      </div>

      <div className="flex justify-end pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-custom-primary text-primary-foreground inline-flex min-h-12 min-w-[190px] cursor-pointer items-center justify-center gap-3 rounded-xl px-6 text-[15px] font-medium transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <LoaderCircle size={18} className="animate-spin" />}

          <span>{isSubmitting ? t("form.submitting") : t("form.submit")}</span>
        </button>
      </div>
    </form>
  );
};

export default DynamicResumeForm;
