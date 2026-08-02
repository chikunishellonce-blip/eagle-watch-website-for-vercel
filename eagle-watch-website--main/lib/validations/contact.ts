import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number we can reach you on.")
    .max(20, "That phone number looks too long."),
  siteType: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more about what you need.").max(2000),
  // Honeypot field — real users never fill this in.
  company_website: z.string().max(0, "").optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
