import { z } from "zod";

interface ResumeValidationMessages {
  fullNameRequired: string;

  emailRequired: string;
  emailInvalid: string;

  phoneRequired: string;
  phoneInvalid: string;

  resumeRequired: string;
}

export const createResumeSchema = ({
  fullNameRequired,

  emailRequired,
  emailInvalid,

  phoneRequired,
  phoneInvalid,

  resumeRequired,
}: ResumeValidationMessages) =>
  z.object({
    fullName: z.string().trim().min(1, fullNameRequired).max(50),

    email: z.string().trim().min(1, emailRequired).max(50).email(emailInvalid),

    phoneNumber: z
      .string()
      .trim()
      .min(1, phoneRequired)
      .max(20)
      .regex(/^09\d{9}$/, phoneInvalid),

    resumeUrl: z.string().trim().min(1, resumeRequired).max(500),
  });

export type ResumeFormValues = z.infer<ReturnType<typeof createResumeSchema>>;
