import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    city: z.ZodString;
    phoneNumber: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export type SignUpForm = z.infer<typeof signupSchema>;
/**
 * Validates signup form data using Zod.
 * Returns either:
 * - validated and sanitized form data, or
 * - a specific error message for the first invalid field.
 */
export declare function validateSignup(input: unknown): SignUpForm | string;
