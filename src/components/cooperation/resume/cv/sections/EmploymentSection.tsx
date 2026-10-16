"use client";

import { useEffect, useMemo } from "react";

import { Controller, type UseFormReturn, useWatch } from "react-hook-form";

import { FormField } from "@/components/FormField";

import type { CVResumeFormValues } from "../cv-resume.types";

import { getDutyStatusOptions } from "../data/cv-options";

import type { ResumeLocale } from "../data/iran-locations";

import FormBooleanField from "../fields/FormBooleanField";
import FormDateField from "../fields/FormDateField";
import FormSection from "../fields/FormSection";
import FormSelectField from "../fields/FormSelectField";

interface EmploymentSectionProps {
  form: UseFormReturn<CVResumeFormValues>;
  locale: ResumeLocale;
  t: (key: string) => string;
}

const EmploymentSection = ({ form, locale, t }: EmploymentSectionProps) => {
  const {
    register,
    control,
    setValue,

    formState: { errors },
  } = form;

  const dutyStatus = useWatch({
    control,
    name: "dutyStatus",
  });

  const askLastBoss = useWatch({
    control,
    name: "askLastBoss",
  });

  const dutyOptions = useMemo(() => getDutyStatusOptions(locale), [locale]);

  useEffect(() => {
    if (dutyStatus !== "exempt") {
      setValue("offDutyReason", "");
    }
  }, [dutyStatus, setValue]);

  useEffect(() => {
    if (askLastBoss !== true) {
      setValue("lastBossName", "");

      setValue("lastBossAddress", "");

      setValue("lastBossPhoneNumber", "");
    }
  }, [askLastBoss, setValue]);

  return (
    <FormSection
      title={t("sections.employment.title")}
      description={t("sections.employment.description")}
    >
      <div className="space-y-7">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormSelectField
            name="dutyStatus"
            control={control}
            label={t("fields.dutyStatus")}
            placeholder={t("placeholders.select")}
            options={dutyOptions}
            error={errors.dutyStatus}
          />

          {dutyStatus === "exempt" && (
            <FormField
              label={t("fields.offDutyReason")}
              register={register("offDutyReason")}
              error={errors.offDutyReason}
            />
          )}

          <FormBooleanField
            name="criminalConviction"
            control={control}
            label={t("fields.criminalConviction")}
            yesLabel={t("common.yes")}
            noLabel={t("common.no")}
            error={errors.criminalConviction}
          />

          <FormBooleanField
            name="grantee"
            control={control}
            label={t("fields.grantee")}
            yesLabel={t("common.yes")}
            noLabel={t("common.no")}
            error={errors.grantee}
          />

          <FormField
            label={t("fields.jobInterest")}
            register={register("jobInterest")}
            error={errors.jobInterest}
          />

          <FormField
            label={t("fields.introducer")}
            register={register("introducer")}
            error={errors.introducer}
          />

          <Controller
            name="startWork"
            control={control}
            render={({ field }) => (
              <FormDateField
                id="startWork"
                label={t("fields.startWork")}
                register={register("startWork")}
                value={field.value}
                onChange={field.onChange}
                error={errors.startWork}
              />
            )}
          />

          <FormField
            label={t("fields.salaryRequest")}
            register={register("salaryRequest")}
            error={errors.salaryRequest}
            inputMode="numeric"
            dir="ltr"
          />

          <FormBooleanField
            name="anotherJob"
            control={control}
            label={t("fields.anotherJob")}
            yesLabel={t("common.yes")}
            noLabel={t("common.no")}
            error={errors.anotherJob}
          />
        </div>

        <FormField
          as="textarea"
          label={t("fields.physicalHealth")}
          register={register("physicalHealth")}
          error={errors.physicalHealth}
        />

        <div className="border-border border-t pt-6">
          <FormBooleanField
            name="askLastBoss"
            control={control}
            label={t("fields.askLastBoss")}
            yesLabel={t("common.yes")}
            noLabel={t("common.no")}
            error={errors.askLastBoss}
          />

          {askLastBoss === true && (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                label={t("fields.lastBossName")}
                register={register("lastBossName")}
                error={errors.lastBossName}
              />

              <FormField
                label={t("fields.lastBossPhoneNumber")}
                type="tel"
                dir="ltr"
                register={register("lastBossPhoneNumber")}
                error={errors.lastBossPhoneNumber}
              />

              <FormField
                as="textarea"
                label={t("fields.lastBossAddress")}
                register={register("lastBossAddress")}
                error={errors.lastBossAddress}
                containerClassName="sm:col-span-2"
              />
            </div>
          )}
        </div>

        <div className="border-border border-t pt-6">
          <FormField
            as="textarea"
            label={t("fields.extra")}
            register={register("extra")}
            error={errors.extra}
          />
        </div>
      </div>
    </FormSection>
  );
};

export default EmploymentSection;
