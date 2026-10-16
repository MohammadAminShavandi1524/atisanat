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

import { emptyEducation } from "../cv-resume.defaults";

import type { CVResumeFormValues } from "../cv-resume.types";

import FormDateField from "../fields/FormDateField";
import FormSection from "../fields/FormSection";

interface EducationSectionProps {
  form:
    UseFormReturn<CVResumeFormValues>;

  t:
    (key: string) => string;
}

const EducationSection = ({
  form,
  t,
}: EducationSectionProps) => {
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
    name: "education",
  });

  const listError =
    typeof errors.education
      ?.message === "string"
      ? errors.education
          .message
      : undefined;

  return (
    <FormSection
      title={t(
        "sections.education.title",
      )}
      description={t(
        "sections.education.description",
      )}
    >
      <div className="space-y-5 s:space-y-6">
        <div className="flex flex-col items-stretch gap-3 s:flex-row s:items-center s:justify-between s:gap-4">
          <div className="min-w-0">
            {listError && (
              <p
                role="alert"
                className="text-destructive text-xs s:truncate"
                title={
                  listError
                }
              >
                {
                  listError
                }
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              append(
                emptyEducation,
              )
            }
            className="border-border text-custom-primary hover:border-custom-primary/60 inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors s:w-auto"
          >
            <Plus
              size={17}
            />

            {t(
              "education.add",
            )}
          </button>
        </div>

        {fields.length === 0 ? (
          <div
            className={`bg-secondary-bg/25 rounded-xl border border-dashed p-4 text-center s:p-6 ${
              listError
                ? "border-destructive"
                : "border-border"
            }`}
          >
            <p className="text-muted-foreground text-[13px] leading-6 s:text-sm">
              {t(
                "education.empty",
              )}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {fields.map(
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
                        "education.item",
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
                        "education.place",
                      )}
                      register={register(
                        `education.${index}.place`,
                      )}
                      error={
                        errors
                          .education?.[
                          index
                        ]?.place
                      }
                    />

                    <FormField
                      label={t(
                        "education.major",
                      )}
                      register={register(
                        `education.${index}.major`,
                      )}
                      error={
                        errors
                          .education?.[
                          index
                        ]?.major
                      }
                    />

                    <FormField
                      label={t(
                        "education.licence",
                      )}
                      register={register(
                        `education.${index}.licence`,
                      )}
                      error={
                        errors
                          .education?.[
                          index
                        ]?.licence
                      }
                    />

                    <Controller
                      name={`education.${index}.start`}
                      control={
                        control
                      }
                      render={({
                        field,
                      }) => (
                        <FormDateField
                          id={`education-${index}-start`}
                          label={t(
                            "education.start",
                          )}
                          register={register(
                            `education.${index}.start`,
                          )}
                          value={
                            field.value
                          }
                          onChange={
                            field.onChange
                          }
                          error={
                            errors
                              .education?.[
                              index
                            ]?.start
                          }
                        />
                      )}
                    />

                    <Controller
                      name={`education.${index}.end`}
                      control={
                        control
                      }
                      render={({
                        field,
                      }) => (
                        <FormDateField
                          id={`education-${index}-end`}
                          label={t(
                            "education.end",
                          )}
                          register={register(
                            `education.${index}.end`,
                          )}
                          value={
                            field.value
                          }
                          onChange={
                            field.onChange
                          }
                          error={
                            errors
                              .education?.[
                              index
                            ]?.end
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              ),
            )}
          </div>
        )}

        <div className="border-border border-t pt-5 s:pt-6">
          <FormField
            as="textarea"
            label={t(
              "fields.research",
            )}
            register={register(
              "research",
            )}
            error={
              errors.research
            }
          />
        </div>
      </div>
    </FormSection>
  );
};

export default EducationSection;
