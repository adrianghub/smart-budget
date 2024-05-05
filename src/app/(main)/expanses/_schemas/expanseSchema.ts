import {z} from "zod";

export const expanseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, {
      message: "Title must be at least 2 characters",
    })
    .max(50, {
      message: "Title must be less than 50 characters",
    }),
  amount: z.coerce.number().min(0, {
    message: "Amount must be a number",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  issueDate: z.coerce.string().min(2, {
    message: "Issue date is required",
  }),
  status: z
    .string()
    .min(1, {
      message: "Status is required",
    })
    .trim(),
  fvRefUrl: z.string().url().optional(),
});
