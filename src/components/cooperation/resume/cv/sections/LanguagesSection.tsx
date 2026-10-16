"use client";

import { useMemo } from "react";

import {
  Plus,
  Trash2,
} from "lucide-react";

import {
  type UseFormReturn,
  useFieldArray,
} from "react-hook-form";

import { FormField } from "@/components/FormField";

import { emptyLanguage } from "../cv-resume.defaults";

import type { CVResumeFormValues } from "../cv-resume.types";

import { getLanguageLevelOptions } from "../data/cv-options";

import type { ResumeLocale } from "../data/iran-locations";

import FormSection from "../fields/FormSection";
import FormSelectField from "../fields/FormSelectField";

interface LanguagesSectionProps {
  form:
    UseFormReturn<CVResumeFormValues>;

  locale:
    ResumeLocale;

  t:
    (key: string) => string;
}

const LanguagesSection = ({
  form,
  locale,
  t,
}: LanguagesSectionProps) => {
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
    name: "languages",
  });

  const levelOptions =
    useMemo(
      () =>
        getLanguageLevelOptions(
          locale,
        ),
      [locale],
    );

  const listError =
    typeof errors.languages
      ?.message === "string"
      ? errors.languages
          .message
      : undefined;

  return (
    <FormSection
      title={t(
        "sections.languages.title",
      )}
      description={t(
        "sections.languages.description",
      )}
    >
      <div className="space-y-5">
        <div className="flex flex-col items-stretch gap-3 s:flex-row s:items-center s:justify-between s:gap-4">
          <div className="min-w-0">
            {listError && (
              <p
                role="alert"
                title={
                  listError
                }
                className="text-destructive text-xs s:truncate"
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
                emptyLanguage,
              )
            }
            className="border-border text-custom-primary hover:border-custom-primary/60 inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors s:w-auto"
          >
            <Plus
              size={17}
            />

            {t(
              "languages.add",
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
                "languages.empty",
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
                      "languages.item",
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

                <div className="grid grid-cols-1 gap-4 s:gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <FormField
                    label={t(
                      "languages.language",
                    )}
                    register={register(
                      `languages.${index}.language`,
                    )}
                    error={
                      errors
                        .languages?.[
                        index
                      ]?.language
                    }
                  />

                  <FormSelectField
                    name={`languages.${index}.read`}
                    control={
                      control
                    }
                    label={t(
                      "languages.read",
                    )}
                    placeholder={t(
                      "placeholders.select",
                    )}
                    options={
                      levelOptions
                    }
                    error={
                      errors
                        .languages?.[
                        index
                      ]?.read
                    }
                  />

                  <FormSelectField
                    name={`languages.${index}.write`}
                    control={
                      control
                    }
                    label={t(
                      "languages.write",
                    )}
                    placeholder={t(
                      "placeholders.select",
                    )}
                    options={
                      levelOptions
                    }
                    error={
                      errors
                        .languages?.[
                        index
                      ]?.write
                    }
                  />

                  <FormSelectField
                    name={`languages.${index}.speak`}
                    control={
                      control
                    }
                    label={t(
                      "languages.speak",
                    )}
                    placeholder={t(
                      "placeholders.select",
                    )}
                    options={
                      levelOptions
                    }
                    error={
                      errors
                        .languages?.[
                        index
                      ]?.speak
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

export default LanguagesSection;
