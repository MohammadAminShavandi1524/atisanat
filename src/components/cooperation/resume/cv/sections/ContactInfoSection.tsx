"use client";

import {
  useEffect,
  useMemo,
} from "react";

import {
  type UseFormReturn,
  useWatch,
} from "react-hook-form";

import { FormField } from "@/components/FormField";

import type { CVResumeFormValues } from "../cv-resume.types";
import {
  getCityOptions,
  getProvinceOptions,
  type ResumeLocale,
} from "../data/iran-locations";
import FormSection from "../fields/FormSection";
import FormSelectField from "../fields/FormSelectField";

interface ContactInfoSectionProps {
  form: UseFormReturn<CVResumeFormValues>;
  locale: ResumeLocale;
  t: (key: string) => string;
}

const ContactInfoSection = ({
  form,
  locale,
  t,
}: ContactInfoSectionProps) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = form;

  const province = useWatch({
    control,
    name: "province",
  });

  const city = useWatch({
    control,
    name: "city",
  });

  const provinceOptions = useMemo(
    () => getProvinceOptions(locale),
    [locale],
  );

  const cityOptions = useMemo(
    () => getCityOptions(province, locale),
    [province, locale],
  );

  useEffect(() => {
    if (
      city &&
      !cityOptions.some(
        (option) => option.value === city,
      )
    ) {
      setValue("city", "");
    }
  }, [city, cityOptions, setValue]);

  return (
    <FormSection
      title={t("sections.contact.title")}
      description={t("sections.contact.description")}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormSelectField
          name="province"
          control={control}
          label={t("fields.province")}
          placeholder={t("placeholders.select")}
          options={provinceOptions}
          error={errors.province}
        />

        <FormSelectField
          name="city"
          control={control}
          label={t("fields.city")}
          placeholder={t("placeholders.select")}
          options={cityOptions}
          error={errors.city}
          disabled={!province}
        />

        <FormField
          label={t("fields.email")}
          type="email"
          dir="ltr"
          autoComplete="email"
          register={register("email")}
          error={errors.email}
        />

        <FormField
          label={t("fields.phoneNumber")}
          type="tel"
          dir="ltr"
          inputMode="tel"
          autoComplete="tel"
          register={register("phoneNumber")}
          error={errors.phoneNumber}
        />

        <FormField
          as="textarea"
          label={t("fields.address")}
          register={register("address")}
          error={errors.address}
          containerClassName="sm:col-span-2"
        />
      </div>
    </FormSection>
  );
};

export default ContactInfoSection;