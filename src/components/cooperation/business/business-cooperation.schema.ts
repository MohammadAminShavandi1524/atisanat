import { z } from "zod";

interface BusinessCooperationValidationMessages {
  fullNameRequired: string;

  emailRequired: string;
  emailInvalid: string;

  phoneRequired: string;
  phoneInvalid: string;

  resumeRequired: string;
}

export const createBusinessCooperationSchema = ({
  fullNameRequired,

  emailRequired,
  emailInvalid,

  phoneRequired,
  phoneInvalid,

  resumeRequired,
}: BusinessCooperationValidationMessages) =>
  z.object({
    fullName: z.string().trim().min(1, fullNameRequired),

    email: z.string().trim().min(1, emailRequired).email(emailInvalid),

    phoneNumber: z
      .string()
      .trim()
      .min(1, phoneRequired)
      .regex(/^09\d{9}$/, phoneInvalid),

    company: z.string().trim().optional(),

    resumeUrl: z.string().trim().min(1, resumeRequired),
  });

export type BusinessCooperationFormValues = z.infer<
  ReturnType<typeof createBusinessCooperationSchema>
>;
