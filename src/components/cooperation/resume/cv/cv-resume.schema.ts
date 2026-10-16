import { z } from "zod";

interface SchemaMessages {
  required: string;
  emailInvalid: string;
  phoneInvalid: string;
  nationalCodeInvalid: string;
  numberInvalid: string;
  exemptReasonRequired: string;
}

export const createCVResumeSchema = (
  messages: SchemaMessages,
) => {
  const requiredText = z
    .string()
    .trim()
    .min(1, messages.required);

  const date = requiredText.regex(
    /^\d{4}-\d{2}-\d{2}$/,
    messages.required,
  );

  const dependentSchema = z.object({
    name: requiredText,
    relation: requiredText,
  });

  const educationSchema = z.object({
    place: requiredText,
    start: date,
    end: date,
    major: requiredText,
    licence: requiredText,
  });

  const languageSchema = z.object({
    language: requiredText,
    read: z.enum(["basic", "intermediate", "advanced"]),
    write: z.enum(["basic", "intermediate", "advanced"]),
    speak: z.enum(["basic", "intermediate", "advanced"]),
  });

  const workExperienceSchema = z.object({
    place: requiredText,
    job: requiredText,
    start: date,
    end: date,
    salary: requiredText,
    leaveReasone: requiredText,
  });

  const closePersonSchema = z.object({
    name: requiredText,
    address: requiredText,
    number: requiredText.regex(
      /^09\d{9}$/,
      messages.phoneInvalid,
    ),
  });

  return z
    .object({
      image: z
        .string()
        .trim()
        .min(1, messages.required)
        .url(messages.required),

      firstName: requiredText,
      lastName: requiredText,
      fatherName: requiredText,

      nationalCode: requiredText.regex(
        /^\d{10}$/,
        messages.nationalCodeInvalid,
      ),

      placeOfIssue: requiredText,

      dateOfBirth: date,

      religion: requiredText,
      mazhab: requiredText,

      married: z.boolean(),

      children: z
        .string()
        .trim()
        .refine(
          (value) => value === "" || /^\d+$/.test(value),
          messages.numberInvalid,
        ),

      dependents: z.array(dependentSchema),

      province: requiredText,
      city: requiredText,
      address: requiredText,

      email: requiredText.email(messages.emailInvalid),

      phoneNumber: requiredText.regex(
        /^09\d{9}$/,
        messages.phoneInvalid,
      ),

      education: z.array(educationSchema),

      research: z.string().trim(),

      languages: z.array(languageSchema),

      workExperience: z.array(workExperienceSchema),

      dutyStatus: z.union([
        z.literal("served"),
        z.literal("not_served"),
        z.literal("exempt"),
        z.literal(""),
      ]),

      offDutyReason: z.string().trim(),

      criminalConviction: z.boolean(),

      physicalHealth: requiredText,

      grantee: z.boolean(),

      jobInterest: requiredText,

      introducer: z.string().trim(),

      startWork: date,

      askLastBoss: z.boolean(),

      lastBossName: z.string().trim(),
      lastBossAddress: z.string().trim(),

      lastBossPhoneNumber: z
        .string()
        .trim()
        .refine(
          (value) =>
            value === "" || /^09\d{9}$/.test(value),
          messages.phoneInvalid,
        ),

      salaryRequest: requiredText.regex(
        /^\d+$/,
        messages.numberInvalid,
      ),

      anotherJob: z.boolean(),

      extra: z.string().trim(),

      closePeopleContact: z
        .array(closePersonSchema)
        .max(2),
    })
    .superRefine((values, ctx) => {
      if (!values.dutyStatus) {
        ctx.addIssue({
          code: "custom",
          path: ["dutyStatus"],
          message: messages.required,
        });
      }

      if (
        values.dutyStatus === "exempt" &&
        !values.offDutyReason.trim()
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["offDutyReason"],
          message: messages.exemptReasonRequired,
        });
      }
    });
};