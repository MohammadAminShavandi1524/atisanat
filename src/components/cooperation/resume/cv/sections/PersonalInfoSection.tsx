"use client";

import {
  useEffect,
  useMemo,
} from "react";

import {
  Plus,
  Trash2,
} from "lucide-react";
import {
  Controller,
  type UseFormReturn,
  useFieldArray,
  useWatch,
} from "react-hook-form";

import { FormField } from "@/components/FormField";

import { emptyDependent } from "../cv-resume.defaults";
import type { CVResumeFormValues } from "../cv-resume.types";
import {
  getDependentRelationOptions,
} from "../data/cv-options";
import type { ResumeLocale } from "../data/iran-locations";
import {
  getMazhabOptions,
  getReligionOptions,
} from "../data/religions";
import FormBooleanField from "../fields/FormBooleanField";
import FormDateField from "../fields/FormDateField";
import FormImageUploadField from "../fields/FormImageUploadField";
import FormSection from "../fields/FormSection";
import FormSelectField from "../fields/FormSelectField";

interface PersonalInfoSectionProps {
  form: UseFormReturn<CVResumeFormValues>;
  locale: ResumeLocale;
  t: (key: string) => string;
}

const PersonalInfoSection = ({
  form,
  locale,
  t,
}: PersonalInfoSectionProps) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = form;

  const religion = useWatch({
    control,
    name: "religion",
  });

  const mazhab = useWatch({
    control,
    name: "mazhab",
  });

  const married = useWatch({
    control,
    name: "married",
  });

  const {
    fields: dependentFields,
    append: appendDependent,
    remove: removeDependent,
  } = useFieldArray({
    control,
    name: "dependents",
  });

  const religionOptions = useMemo(
    () => getReligionOptions(locale),
    [locale],
  );

  const mazhabOptions = useMemo(
    () => getMazhabOptions(religion, locale),
    [religion, locale],
  );

  const relationOptions = useMemo(
    () => getDependentRelationOptions(locale),
    [locale],
  );

  useEffect(() => {
    if (!married) {
      setValue("children", "");
    }
  }, [married, setValue]);

  useEffect(() => {
    if (
      mazhab &&
      !mazhabOptions.some(
        (option) => option.value === mazhab,
      )
    ) {
      setValue("mazhab", "");
    }
  }, [
    mazhab,
    mazhabOptions,
    setValue,
  ]);

  return (
    <FormSection
      title={t("sections.personal.title")}
      description={t("sections.personal.description")}
    >
      <div className="space-y-6">
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <FormImageUploadField
              label={t("fields.image.label")}
              placeholder={t("fields.image.placeholder")}
              uploadingLabel={t("fields.image.uploading")}
              removeLabel={t("fields.image.remove")}
              invalidFileMessage={t("validation.imageInvalid")}
              uploadErrorMessage={t("validation.imageUploadFailed")}
              value={field.value}
              onChange={field.onChange}
              error={errors.image?.message}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <FormField
            label={t("fields.firstName")}
            register={register("firstName")}
            error={errors.firstName}
          />

          <FormField
            label={t("fields.lastName")}
            register={register("lastName")}
            error={errors.lastName}
          />

          <FormField
            label={t("fields.fatherName")}
            register={register("fatherName")}
            error={errors.fatherName}
          />

          <FormField
            label={t("fields.nationalCode")}
            register={register("nationalCode")}
            error={errors.nationalCode}
            inputMode="numeric"
            dir="ltr"
          />

          <FormField
            label={t("fields.placeOfIssue")}
            register={register("placeOfIssue")}
            error={errors.placeOfIssue}
          />

          <FormDateField
            id="dateOfBirth"
            label={t("fields.dateOfBirth")}
            register={register("dateOfBirth")}
            error={errors.dateOfBirth}
          />

          <FormSelectField
            name="religion"
            control={control}
            label={t("fields.religion")}
            placeholder={t("placeholders.select")}
            options={religionOptions}
            error={errors.religion}
          />

          <FormSelectField
            name="mazhab"
            control={control}
            label={t("fields.mazhab")}
            placeholder={t("placeholders.select")}
            options={mazhabOptions}
            error={errors.mazhab}
            disabled={!religion}
          />

          <FormBooleanField
            name="married"
            control={control}
            label={t("fields.married")}
            yesLabel={t("common.yes")}
            noLabel={t("common.no")}
          />

          <FormField
            label={t("fields.children")}
            register={register("children")}
            error={errors.children}
            inputMode="numeric"
            disabled={!married}
          />
        </div>

        <div className="border-border border-t pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-foreground font-semibold">
                {t("dependents.title")}
              </h3>

              <p className="text-muted-foreground mt-1 text-sm">
                {t("dependents.description")}
              </p>
            </div>

            <button
              type="button"
              onClick={() => appendDependent(emptyDependent)}
              className="border-border text-custom-primary hover:border-custom-primary/60 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
            >
              <Plus size={17} />
              {t("dependents.add")}
            </button>
          </div>

          {dependentFields.length > 0 && (
            <div className="mt-5 space-y-4">
              {dependentFields.map((field, index) => (
                <div
                  key={field.id}
                  className="border-border bg-secondary-bg/25 rounded-xl border p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-foreground text-sm font-semibold">
                      {t("dependents.item")} {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeDependent(index)}
                      className="text-muted-foreground hover:text-destructive flex size-8 cursor-pointer items-center justify-center"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <FormField
                      label={t("dependents.name")}
                      register={register(
                        `dependents.${index}.name`,
                      )}
                      error={
                        errors.dependents?.[index]?.name
                      }
                    />

                    <FormSelectField
                      name={`dependents.${index}.relation`}
                      control={control}
                      label={t("dependents.relation")}
                      placeholder={t("placeholders.select")}
                      options={relationOptions}
                      error={
                        errors.dependents?.[index]?.relation
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </FormSection>
  );
};

export default PersonalInfoSection;