import {
  z,
} from "zod";

interface SchemaMessages {
  required: string;

  emailInvalid: string;
  phoneInvalid: string;

  nationalCodeInvalid: string;

  numberInvalid: string;

  exemptReasonRequired: string;

  educationRequired: string;
  languageRequired: string;

  booleanRequired: string;

  childrenRequired: string;

  invalidDateRange: string;
}

const isValidIranianNationalCode = (
  value: string,
) => {
  if (
    !/^\d{10}$/.test(
      value,
    )
  ) {
    return false;
  }

  if (
    /^(\d)\1{9}$/.test(
      value,
    )
  ) {
    return false;
  }

  const checkDigit =
    Number(
      value[9],
    );

  const sum =
    value
      .slice(0, 9)
      .split("")
      .reduce(
        (
          total,
          digit,
          index,
        ) =>
          total +
          Number(digit) *
            (10 - index),
        0,
      );

  const remainder =
    sum % 11;

  if (
    remainder < 2
  ) {
    return (
      checkDigit ===
      remainder
    );
  }

  return (
    checkDigit ===
    11 - remainder
  );
};

const isValidDateRange = (
  start: string,
  end: string,
) => {
  if (
    !start ||
    !end
  ) {
    return true;
  }

  return (
    start <= end
  );
};

export const createCVResumeSchema = (
  messages: SchemaMessages,
) => {
  const requiredText =
    z
      .string()
      .trim()
      .min(
        1,
        messages.required,
      );

  const requiredDate =
    z
      .string()
      .trim()
      .min(
        1,
        messages.required,
      )
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        messages.required,
      );

  const requiredBoolean =
    z
      .boolean()
      .nullable()
      .refine(
        (
          value,
        ) =>
          value !== null,
        {
          message:
            messages.booleanRequired,
        },
      );

  const dependentSchema =
    z.object({
      name:
        requiredText,

      relation:
        requiredText,
    });

  const educationSchema =
    z
      .object({
        place:
          requiredText,

        start:
          requiredDate,

        end:
          requiredDate,

        major:
          requiredText,

        licence:
          requiredText,
      })
      .superRefine(
        (
          values,
          ctx,
        ) => {
          if (
            !isValidDateRange(
              values.start,
              values.end,
            )
          ) {
            ctx.addIssue({
              code:
                "custom",

              path: [
                "end",
              ],

              message:
                messages.invalidDateRange,
            });
          }
        },
      );

  const languageSchema =
    z.object({
      language:
        requiredText,

      read:
        z.enum([
          "basic",
          "intermediate",
          "advanced",
        ]),

      write:
        z.enum([
          "basic",
          "intermediate",
          "advanced",
        ]),

      speak:
        z.enum([
          "basic",
          "intermediate",
          "advanced",
        ]),
    });

  const workExperienceSchema =
    z
      .object({
        place:
          requiredText,

        job:
          requiredText,

        start:
          requiredDate,

        end:
          requiredDate,

        salary:
          requiredText.regex(
            /^\d+$/,
            messages.numberInvalid,
          ),

        leaveReasone:
          requiredText,
      })
      .superRefine(
        (
          values,
          ctx,
        ) => {
          if (
            !isValidDateRange(
              values.start,
              values.end,
            )
          ) {
            ctx.addIssue({
              code:
                "custom",

              path: [
                "end",
              ],

              message:
                messages.invalidDateRange,
            });
          }
        },
      );

  const closePersonSchema =
    z.object({
      name:
        requiredText,

      address:
        requiredText,

      number:
        requiredText.regex(
          /^09\d{9}$/,
          messages.phoneInvalid,
        ),
    });

  return z
    .object({
      image:
        z
          .string()
          .trim()
          .min(
            1,
            messages.required,
          )
          .url(
            messages.required,
          ),

      firstName:
        requiredText,

      lastName:
        requiredText,

      fatherName:
        requiredText,

      nationalCode:
        requiredText.refine(
          isValidIranianNationalCode,
          {
            message:
              messages.nationalCodeInvalid,
          },
        ),

      placeOfIssue:
        requiredText,

      dateOfBirth:
        requiredDate,

      religion:
        requiredText,

      mazhab:
        requiredText,

      married:
        requiredBoolean,

      children:
        z
          .string()
          .trim()
          .refine(
            (
              value,
            ) =>
              value ===
                "" ||
              /^\d+$/.test(
                value,
              ),
            {
              message:
                messages.numberInvalid,
            },
          ),

      dependents:
        z.array(
          dependentSchema,
        ),

      province:
        requiredText,

      city:
        requiredText,

      address:
        requiredText,

      email:
        z
          .string()
          .trim()
          .min(
            1,
            messages.required,
          )
          .email(
            messages.emailInvalid,
          ),

      phoneNumber:
        z
          .string()
          .trim()
          .min(
            1,
            messages.required,
          )
          .regex(
            /^09\d{9}$/,
            messages.phoneInvalid,
          ),

      education:
        z
          .array(
            educationSchema,
          )
          .min(
            1,
            messages.educationRequired,
          ),

      research:
        z
          .string()
          .trim(),

      languages:
        z
          .array(
            languageSchema,
          )
          .min(
            1,
            messages.languageRequired,
          ),

      workExperience:
        z.array(
          workExperienceSchema,
        ),

      dutyStatus:
        z.union([
          z.literal(
            "served",
          ),

          z.literal(
            "not_served",
          ),

          z.literal(
            "exempt",
          ),

          z.literal(""),
        ]),

      offDutyReason:
        z
          .string()
          .trim(),

      criminalConviction:
        requiredBoolean,

      physicalHealth:
        requiredText,

      grantee:
        requiredBoolean,

      jobInterest:
        requiredText,

      introducer:
        z
          .string()
          .trim(),

      startWork:
        requiredDate,

      askLastBoss:
        requiredBoolean,

      lastBossName:
        z
          .string()
          .trim(),

      lastBossAddress:
        z
          .string()
          .trim(),

      lastBossPhoneNumber:
        z
          .string()
          .trim()
          .refine(
            (
              value,
            ) =>
              value ===
                "" ||
              /^09\d{9}$/.test(
                value,
              ),
            {
              message:
                messages.phoneInvalid,
            },
          ),

      salaryRequest:
        z
          .string()
          .trim()
          .min(
            1,
            messages.required,
          )
          .regex(
            /^\d+$/,
            messages.numberInvalid,
          ),

      anotherJob:
        requiredBoolean,

      extra:
        z
          .string()
          .trim(),

      closePeopleContact:
        z
          .array(
            closePersonSchema,
          )
          .max(2),
    })
    .superRefine(
      (
        values,
        ctx,
      ) => {
        if (
          !values.dutyStatus
        ) {
          ctx.addIssue({
            code:
              "custom",

            path: [
              "dutyStatus",
            ],

            message:
              messages.required,
          });
        }

        if (
          values.married ===
            true &&
          !values.children.trim()
        ) {
          ctx.addIssue({
            code:
              "custom",

            path: [
              "children",
            ],

            message:
              messages.childrenRequired,
          });
        }

        if (
          values.dutyStatus ===
            "exempt" &&
          !values.offDutyReason.trim()
        ) {
          ctx.addIssue({
            code:
              "custom",

            path: [
              "offDutyReason",
            ],

            message:
              messages.exemptReasonRequired,
          });
        }
      },
    );
};