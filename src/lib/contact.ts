import { z } from "zod";
export const contactSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  projectType: z.string().min(2, "Required"),
  projectDetails: z.string().min(10, "Please provide more details"),
});
export type ContactValues = z.infer<typeof contactSchema>;
