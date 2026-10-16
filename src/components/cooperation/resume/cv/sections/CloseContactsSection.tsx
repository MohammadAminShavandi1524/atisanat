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

import { emptyClosePerson } from "../cv-resume.defaults";
import type { CVResumeFormValues } from "../cv-resume.types";
import FormSection from "../fields/FormSection";

interface CloseContactsSectionProps {
  form: UseFormReturn<CVResumeFormValues>;
  t: (key: string) => string;
}

const CloseContactsSection = ({
  form,
  t,
}: CloseContactsSectionProps) => {
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
    name: "closePeopleContact",
  });

  return (
    <FormSection
      title={t("sections.contacts.title")}
      description={t("sections.contacts.description")}
    >
      <div className="space-y-5">
        {fields.length < 2 && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => append(emptyClosePerson)}
              className="border-border text-custom-primary hover:border-custom-primary/60 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
            >
              <Plus size={17} />
              {t("contacts.add")}
            </button>
          </div>
        )}

        {fields.length === 0 ? (
          <div className="border-border bg-secondary-bg/25 rounded-xl border border-dashed p-6 text-center">
            <p className="text-muted-foreground text-sm">
              {t("contacts.empty")}
            </p>
          </div>
        ) : (
          fields.map((field, index) => (
            <div
              key={field.id}
              className="border-border bg-secondary-bg/20 rounded-xl border p-4 sm:p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-foreground font-semibold">
                  {t("contacts.item")} {index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-muted-foreground hover:text-destructive flex size-8 cursor-pointer items-center justify-center"
                >
                  <Trash2 size={17} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField
                  label={t("contacts.name")}
                  register={register(
                    `closePeopleContact.${index}.name`,
                  )}
                  error={
                    errors.closePeopleContact?.[index]?.name
                  }
                />

                <FormField
                  label={t("contacts.number")}
                  type="tel"
                  dir="ltr"
                  register={register(
                    `closePeopleContact.${index}.number`,
                  )}
                  error={
                    errors.closePeopleContact?.[index]
                      ?.number
                  }
                />

                <FormField
                  as="textarea"
                  label={t("contacts.address")}
                  register={register(
                    `closePeopleContact.${index}.address`,
                  )}
                  error={
                    errors.closePeopleContact?.[index]
                      ?.address
                  }
                  containerClassName="sm:col-span-2"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </FormSection>
  );
};

export default CloseContactsSection;