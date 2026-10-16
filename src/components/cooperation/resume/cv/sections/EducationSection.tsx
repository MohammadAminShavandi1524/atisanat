"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";
import {
  type UseFormReturn,
  useFieldArray,
} from "react-hook-form";

import { FormField } from "@/components/FormField";

import { emptyEducation } from "../cv-resume.defaults";
import type { CVResumeFormValues } from "../cv-resume.types";
import FormDateField from "../fields/FormDateField";
import FormSection from "../fields/FormSection";

interface EducationSectionProps {
  form: UseFormReturn<CVResumeFormValues>;
  t: (key: string) => string;
}

const EducationSection = ({
  form,
  t,
}: EducationSectionProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <FormSection
      title={t("sections.education.title")}
      description={t("sections.education.description")}
    >
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => append(emptyEducation)}
            className="border-border text-custom-primary hover:border-custom-primary/60 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
          >
            <Plus size={17} />
            {t("education.add")}
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="border-border bg-secondary-bg/25 rounded-xl border border-dashed p-6 text-center">
            <p className="text-muted-foreground text-sm">
              {t("education.empty")}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border-border bg-secondary-bg/20 rounded-xl border p-4 sm:p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-foreground font-semibold">
                    {t("education.item")} {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-muted-foreground hover:text-destructive flex size-8 cursor-pointer items-center justify-center"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    label={t("education.place")}
                    register={register(
                      `education.${index}.place`,
                    )}
                    error={
                      errors.education?.[index]?.place
                    }
                  />

                  <FormField
                    label={t("education.major")}
                    register={register(
                      `education.${index}.major`,
                    )}
                    error={
                      errors.education?.[index]?.major
                    }
                  />

                  <FormField
                    label={t("education.licence")}
                    register={register(
                      `education.${index}.licence`,
                    )}
                    error={
                      errors.education?.[index]?.licence
                    }
                  />

                  <FormDateField
                    id={`education-${index}-start`}
                    label={t("education.start")}
                    register={register(
                      `education.${index}.start`,
                    )}
                    error={
                      errors.education?.[index]?.start
                    }
                  />

                  <FormDateField
                    id={`education-${index}-end`}
                    label={t("education.end")}
                    register={register(
                      `education.${index}.end`,
                    )}
                    error={
                      errors.education?.[index]?.end
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-border border-t pt-6">
          <FormField
            as="textarea"
            label={t("fields.research")}
            register={register("research")}
            error={errors.research}
          />
        </div>
      </div>
    </FormSection>
  );
};

export default EducationSection;