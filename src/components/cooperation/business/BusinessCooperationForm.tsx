"use client";

import { useMemo, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useCustomToast } from "@/components/ui/custom-toast";

import { uploadResumePdf } from "../resume/resume-upload.api";

import BusinessResumeUploadField from "./BusinessResumeUploadField";

import { createBusinessCooperation } from "./business-cooperation.api";
import {
  createBusinessCooperationSchema,
  type BusinessCooperationFormValues,
} from "./business-cooperation.schema";

const BusinessCooperationForm = () => {
  const locale = useLocale();
  const t = useTranslations("BusinessCooperation");

  const toast = useCustomToast();

  const isRTL = locale === "fa";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [resumeFile, setResumeFile] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);

  const schema = useMemo(
    () =>
      createBusinessCooperationSchema({
        fullNameRequired: t("validation.fullNameRequired"),

        emailRequired: t("validation.emailRequired"),
        emailInvalid: t("validation.emailInvalid"),

        phoneRequired: t("validation.phoneRequired"),
        phoneInvalid: t("validation.phoneInvalid"),

        resumeRequired: t("validation.resumeRequired"),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    clearErrors,

    formState: { errors, isSubmitting },
  } = useForm<BusinessCooperationFormValues>({
    resolver: zodResolver(schema),

    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      company: "",
      resumeUrl: "",
    },
  });

  const handleResumeChange = async (file?: File) => {
    if (!file) {
      setResumeFile(undefined);
      setUploadProgress(0);
      setIsUploading(false);
      setIsFinalizing(false);

      setValue("resumeUrl", "");

      return;
    }

    if (file.type !== "application/pdf") {
      setError("resumeUrl", {
        type: "manual",
        message: t("validation.resumeInvalid"),
      });

      return;
    }

    setResumeFile(file);
    setUploadProgress(0);
    setIsUploading(true);
    setIsFinalizing(false);

    setValue("resumeUrl", "");
    clearErrors("resumeUrl");

    try {
      const data = await uploadResumePdf(file, {
        onProgress: (progress) => {
          setUploadProgress(progress);
        },

        onFinalizing: () => {
          setUploadProgress(100);
          setIsFinalizing(true);
        },
      });

      setValue("resumeUrl", data.url, {
        shouldValidate: true,
      });

      clearErrors("resumeUrl");
    } catch (error) {
      console.error("BUSINESS RESUME UPLOAD ERROR:", error);

      setResumeFile(undefined);
      setUploadProgress(0);

      setValue("resumeUrl", "");

      setError("resumeUrl", {
        type: "manual",
        message: t("validation.resumeUploadFailed"),
      });

      toast.error(t("toast.uploadError"));
    } finally {
      setIsUploading(false);
      setIsFinalizing(false);
    }
  };

  const onSubmit = async (data: BusinessCooperationFormValues) => {
    try {
      await createBusinessCooperation({
        full_name: data.fullName,
        email: data.email,
        phone_number: data.phoneNumber,
        company: data.company?.trim() || null,
        resume: data.resumeUrl,
      });

      reset();

      setResumeFile(undefined);
      setUploadProgress(0);
      setIsUploading(false);
      setIsFinalizing(false);

      toast.success(t("toast.success"));
    } catch (error) {
      console.error("CREATE BUSINESS COOPERATION ERROR:", error);

      toast.error(t("toast.error"));
    }
  };

  const isFormBusy = isSubmitting || isUploading || isFinalizing;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-border rounded-2xl border p-12"
    >
      {/* Fields */}
      <div className="grid grid-cols-2 gap-x-7 gap-y-7">
        {/* Full Name */}
        <div className="min-w-0">
          <div className="mb-2.5 flex items-center justify-between gap-4">
            <label
              htmlFor="fullName"
              className="text-foreground text-[14px] font-medium"
            >
              {t("form.fullName")}
            </label>

            {errors.fullName && (
              <span className="text-destructive text-xs">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder={t("form.fullNamePlaceholder")}
            {...register("fullName")}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-13 w-full rounded-xl border px-4 text-[14px] transition-colors duration-300 outline-none"
          />
        </div>

        {/* Phone */}
        <div className="min-w-0">
          <div className="mb-2.5 flex items-center justify-between gap-4">
            <label
              htmlFor="phoneNumber"
              className="text-foreground text-[14px] font-medium"
            >
              {t("form.phone")}
            </label>

            {errors.phoneNumber && (
              <span className="text-destructive text-xs">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <input
            id="phoneNumber"
            type="tel"
            dir={locale === "en" ? "ltr" : "rtl"}
            autoComplete="tel"
            placeholder={t("form.phonePlaceholder")}
            {...register("phoneNumber")}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-13 w-full rounded-xl border px-4 text-[14px] transition-colors duration-300 outline-none"
          />
        </div>

        {/* Email */}
        <div className="min-w-0">
          <div className="mb-2.5 flex items-center justify-between gap-4">
            <label
              htmlFor="email"
              className="text-foreground text-[14px] font-medium"
            >
              {t("form.email")}
            </label>

            {errors.email && (
              <span className="text-destructive text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <input
            id="email"
            type="email"
          
            autoComplete="email"
            placeholder={t("form.emailPlaceholder")}
            {...register("email")}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-13 w-full rounded-xl border px-4 text-[14px] transition-colors duration-300 outline-none"
          />
        </div>

        {/* Company */}
        <div className="min-w-0">
          <div className="mb-2.5 flex items-center justify-between gap-4">
            <label
              htmlFor="company"
              className="text-foreground text-[14px] font-medium"
            >
              {t("form.company")}

              <span className="text-muted-foreground ms-2 text-xs font-normal">
                ({t("form.companyOptional")})
              </span>
            </label>
          </div>

          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder={t("form.companyPlaceholder")}
            {...register("company")}
            className="border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-13 w-full rounded-xl border px-4 text-[14px] transition-colors duration-300 outline-none"
          />
        </div>
      </div>

      {/* Resume */}
      <div className="border-border mt-9 border-t pt-8">
        <BusinessResumeUploadField
          value={resumeFile}
          onChange={handleResumeChange}
          error={errors.resumeUrl?.message}
          progress={uploadProgress}
          isUploading={isUploading}
          isFinalizing={isFinalizing}
        />
      </div>

      {/* Submit */}
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isFormBusy}
          className="bg-custom-primary text-primary-foreground inline-flex min-h-12 min-w-[190px] cursor-pointer items-center justify-center gap-3 rounded-xl px-6 text-[15px] font-medium transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{isSubmitting ? t("form.submitting") : t("form.submit")}</span>

          <ArrowIcon size={18} strokeWidth={1.8} />
        </button>
      </div>
    </form>
  );
};

export default BusinessCooperationForm;
