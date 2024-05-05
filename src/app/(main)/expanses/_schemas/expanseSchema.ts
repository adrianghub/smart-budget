import {z} from "zod";

export const expanseSchema = z.object({
  title: z
    .string({
      required_error: "Title must be between 2 and 50 characters",
      invalid_type_error: "Title must be a string",
    })
    .trim()
    .min(2)
    .max(50),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .min(0),
  category: z.object({
    value: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
      })
      .trim(),
    label: z.string(),
  }),
  issueDate: z.date({
    required_error: "Issue date is required",
    invalid_type_error: "Issue date must be a date",
  }),
  status: z.object({
    value: z.string({
      required_error: "Status is required",
      invalid_type_error: "Status must be a string",
    }),
    label: z.string(),
  }),
  fvRefUrl: z.string().url().optional(),
});
