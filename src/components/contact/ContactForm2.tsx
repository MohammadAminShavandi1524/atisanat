"use client";

import { useMemo } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCustomToast } from "@/components/ui/custom-toast";

import { createContact } from "./contact.api";
import { ContactFormValues, createContactSchema } from "./contact.schema";

const ease = [0.16, 1, 0.3, 1] as const;

const ContactForm2 = () => {
  const locale = useLocale();
  const t = useTranslations("Contact");

  const toast = useCustomToast();

  const isRTL = locale === "fa";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const schema = useMemo(
    () =>
      createContactSchema({
        nameRequired: t("validation.nameRequired"),
        phoneRequired: t("validation.phoneRequired"),
        phoneInvalid: t("validation.phoneInvalid"),
        emailRequired: t("validation.emailRequired"),
        emailInvalid: t("validation.emailInvalid"),
        companyRequired: t("validation.companyRequired"),
        messageRequired: t("validation.messageRequired"),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      companyName: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await createContact({
        full_name: data.name,
        phone_number: data.phone,
        email: data.email,
        company: data.companyName,
        message: data.message,
      });

      reset();

      toast.success(t("toast.success"));
    } catch (error) {
      console.error("CREATE CONTACT ERROR:", error);

      toast.error(t("toast.error"));
    }
  };

  return (
    <motion.form
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay: 0.16,
        ease,
      }}
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10"
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-7">
        {/* Name */}
        <div className="min-w-0">
          <div className="mb-2.5 flex items-center justify-between gap-4">
            <label
              htmlFor="name"
              className="text-foreground text-[14px] font-medium"
            >
              {t("form.name")}
            </label>

            {errors.name && (
              <span className="text-destructive text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t("form.namePlaceholder")}
            {...register("name")}
            className="border-border bg-secondary-bg/40 text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-13 w-full rounded-xl border px-4 text-[14px] transition-colors duration-300 outline-none"
          />
        </div>

        {/* Phone */}
        <div className="min-w-0">
          <div className="mb-2.5 flex items-center justify-between gap-4">
            <label
              htmlFor="phone"
              className="text-foreground text-[14px] font-medium"
            >
              {t("form.phone")}
            </label>

            {errors.phone && (
              <span className="text-destructive text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>

          <input
            id="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            placeholder={t("form.phonePlaceholder")}
            {...register("phone")}
            className="border-border bg-secondary-bg/40 text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-13 w-full rounded-xl border px-4 text-[14px] transition-colors duration-300 outline-none"
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
            dir="ltr"
            autoComplete="email"
            placeholder={t("form.emailPlaceholder")}
            {...register("email")}
            className="border-border bg-secondary-bg/40 text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-13 w-full rounded-xl border px-4 text-[14px] transition-colors duration-300 outline-none"
          />
        </div>

        {/* Company */}
        <div className="min-w-0">
          <div className="mb-2.5 flex items-center justify-between gap-4">
            <label
              htmlFor="companyName"
              className="text-foreground text-[14px] font-medium"
            >
              {t("form.companyName")}
            </label>

            {errors.companyName && (
              <span className="text-destructive text-xs">
                {errors.companyName.message}
              </span>
            )}
          </div>

          <input
            id="companyName"
            type="text"
            autoComplete="organization"
            placeholder={t("form.companyPlaceholder")}
            {...register("companyName")}
            className="border-border bg-secondary-bg/40 text-foreground placeholder:text-muted-foreground focus:border-custom-primary h-13 w-full rounded-xl border px-4 text-[14px] transition-colors duration-300 outline-none"
          />
        </div>

        {/* Message */}
        <div className="col-span-2 min-w-0">
          <div className="mb-2.5 flex items-center justify-between gap-4">
            <label
              htmlFor="message"
              className="text-foreground text-[14px] font-medium"
            >
              {t("form.message")}
            </label>

            {errors.message && (
              <span className="text-destructive text-xs">
                {errors.message.message}
              </span>
            )}
          </div>

          <textarea
            id="message"
            rows={6}
            placeholder={t("form.messagePlaceholder")}
            {...register("message")}
            className="border-border bg-secondary-bg/40 text-foreground placeholder:text-muted-foreground focus:border-custom-primary min-h-[180px] w-full resize-none rounded-xl border px-4 py-4 text-[14px] leading-7 transition-colors duration-300 outline-none"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-7 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-custom-primary text-primary-foreground inline-flex min-h-12 min-w-[180px] cursor-pointer items-center justify-center gap-3 rounded-xl px-6 text-[15px] font-medium transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{isSubmitting ? t("form.sending") : t("form.submit")}</span>

          <ArrowIcon size={18} strokeWidth={1.8} />
        </button>
      </div>
    </motion.form>
  );
};

export default ContactForm2;
