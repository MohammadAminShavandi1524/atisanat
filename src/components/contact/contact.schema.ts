import { z } from "zod";

type ValidationMessages = {
  nameRequired: string;
  phoneRequired: string;
  phoneInvalid: string;
  emailRequired: string;
  emailInvalid: string;
  companyRequired: string;
  messageRequired: string;
};

export const createContactSchema = ({
  nameRequired,
  phoneRequired,
  phoneInvalid,
  emailRequired,
  emailInvalid,
  companyRequired,
  messageRequired,
}: ValidationMessages) =>
  z.object({
    name: z.string().trim().min(1, nameRequired).max(50),

    phone: z
      .string()
      .trim()
      .min(1, phoneRequired)
      .regex(/^09\d{9}$/, phoneInvalid),

    email: z
      .string()
      .trim()
      .min(1, emailRequired)
      .max(50)
      .email(emailInvalid)
      .refine(
        (value) => {
          const domain = value.split("@")[1];

          if (!domain) return false;

          return /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain);
        },
        {
          message: emailInvalid,
        },
      ),

    companyName: z.string().trim().min(1, companyRequired).max(50),

    message: z.string().trim().min(1, messageRequired).max(500),
  });

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
