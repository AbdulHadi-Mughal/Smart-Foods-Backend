import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters.")
      .max(20, "Username must be at most 20 characters.")
      .min(1, "Username is required."),

    email: z
      .email("Email format is invalid.")
      .trim()
      .toLowerCase()
      .min(1, "Email is required."),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .min(1, "Password is required."),

    city: z
      .string()
      .trim()
      .min(2, "City name must be at least 2 characters.")
      .min(1, "City name is required."),

    phoneNumber: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[0-9]{10,15}$/.test(val),
        "Phone number must contain 10–15 digits."
      ),
  })
  .strict();

export type SignUpForm = z.infer<typeof signupSchema>;

/**
 * Validates signup form data using Zod.
 * Returns either:
 * - validated and sanitized form data, or
 * - a specific error message for the first invalid field.
 */
export function validateSignup(input: unknown): SignUpForm | string {
  const result = signupSchema.safeParse(input);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    const firstErrorMessage = firstIssue.message || "Invalid input";
    return firstErrorMessage;
  }

  return result.data;
}
