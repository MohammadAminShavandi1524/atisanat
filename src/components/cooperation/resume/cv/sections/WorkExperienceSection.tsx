"use client";

import {
  Plus,
  Trash2,
} from "lucide-react";

import {
  Controller,
  type UseFormReturn,
  useFieldArray,
} from "react-hook-form";

import { FormField } from "@/components/FormField";

import { emptyWorkExperience } from "../cv-resume.defaults";

import type { CVResumeFormValues } from "../cv-resume.types";

import FormDateField from "../fields/FormDateField";
import FormSection from "../fields/FormSection";

interface WorkExperienceSectionProps {
  form:
    UseFormReturn<CVResumeFormValues>;

  t:
    (key: string) => string;
}

const WorkExperienceSection = ({
  form,
  t,
}: WorkExperienceSectionProps) => {
  const {
    register,
    control,

    formState: {
      errors,
    },
  } = form;

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name:
      "workExperience",
  });

  return (
    <FormSection
      title={t(
        "sections.work.title",
      )}
      description={t(
        "sections.work.description",
      )}
    >
      <div className="space-y-5">
        <div className="flex justify-stretch s:justify-end">
          <button
            type="button"
            onClick={() =>
              append(
                emptyWorkExperience,
              )
            }
            className="border-border text-custom-primary hover:border-custom-primary/60 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors s:w-auto"
          >
            <Plus
              size={17}
            />

            {t(
              "work.add",
            )}
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="border-border bg-secondary-bg/25 rounded-xl border border-dashed p-4 text-center s:p-6">
            <p className="text-muted-foreground text-[13px] leading-6 s:text-sm">
              {t(
                "work.empty",
              )}
            </p>
          </div>
        ) : (
          fields.map(
            (
              field,
              index,
            ) => (
              <div
                key={
                  field.id
                }
                className="border-border border-t bg-transparent py-5 first:border-t-0 first:pt-0 s:rounded-xl s:border s:bg-secondary-bg/20 s:p-4 s:first:border-t sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between s:mb-5">
                  <h3 className="text-foreground text-[15px] font-semibold s:text-base">
                    {t(
                      "work.item",
                    )}{" "}
                    {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      remove(
                        index,
                      )
                    }
                    className="text-muted-foreground hover:text-destructive flex size-8 cursor-pointer items-center justify-center"
                  >
                    <Trash2
                      size={17}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 s:gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    label={t(
                      "work.place",
                    )}
                    register={register(
                      `workExperience.${index}.place`,
                    )}
                    error={
                      errors
                        .workExperience?.[
                        index
                      ]?.place
                    }
                  />

                  <FormField
                    label={t(
                      "work.job",
                    )}
                    register={register(
                      `workExperience.${index}.job`,
                    )}
                    error={
                      errors
                        .workExperience?.[
                        index
                      ]?.job
                    }
                  />

                  <FormField
                    label={t(
                      "work.salary",
                    )}
                    dir="ltr"
                    inputMode="numeric"
                    register={register(
                      `workExperience.${index}.salary`,
                    )}
                    error={
                      errors
                        .workExperience?.[
                        index
                      ]?.salary
                    }
                  />

                  <Controller
                    name={`workExperience.${index}.start`}
                    control={
                      control
                    }
                    render={({
                      field,
                    }) => (
                      <FormDateField
                        id={`work-${index}-start`}
                        label={t(
                          "work.start",
                        )}
                        register={register(
                          `workExperience.${index}.start`,
                        )}
                        value={
                          field.value
                        }
                        onChange={
                          field.onChange
                        }
                        error={
                          errors
                            .workExperience?.[
                            index
                          ]?.start
                        }
                      />
                    )}
                  />

                  <Controller
                    name={`workExperience.${index}.end`}
                    control={
                      control
                    }
                    render={({
                      field,
                    }) => (
                      <FormDateField
                        id={`work-${index}-end`}
                        label={t(
                          "work.end",
                        )}
                        register={register(
                          `workExperience.${index}.end`,
                        )}
                        value={
                          field.value
                        }
                        onChange={
                          field.onChange
                        }
                        error={
                          errors
                            .workExperience?.[
                            index
                          ]?.end
                        }
                      />
                    )}
                  />

                  <FormField
                    label={t(
                      "work.leaveReason",
                    )}
                    register={register(
                      `workExperience.${index}.leaveReasone`,
                    )}
                    error={
                      errors
                        .workExperience?.[
                        index
                      ]?.leaveReasone
                    }
                  />
                </div>
              </div>
            ),
          )
        )}
      </div>
    </FormSection>
  );
};

export default WorkExperienceSection;
