"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = void 0;
exports.validateSignup = validateSignup;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z
    .object({
    username: zod_1.z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters.")
        .max(20, "Username must be at most 20 characters.")
        .min(1, "Username is required."),
    email: zod_1.z
        .email("Email format is invalid.")
        .trim()
        .toLowerCase()
        .min(1, "Email is required."),
    password: zod_1.z
        .string()
        .min(6, "Password must be at least 6 characters.")
        .min(1, "Password is required."),
    city: zod_1.z
        .string()
        .trim()
        .min(2, "City name must be at least 2 characters.")
        .min(1, "City name is required."),
    phoneNumber: zod_1.z
        .string()
        .optional()
        .refine((val) => !val || /^[0-9]{10,15}$/.test(val), "Phone number must contain 10–15 digits."),
})
    .strict();
/**
 * Validates signup form data using Zod.
 * Returns either:
 * - validated and sanitized form data, or
 * - a specific error message for the first invalid field.
 */
function validateSignup(input) {
    const result = exports.signupSchema.safeParse(input);
    if (!result.success) {
        const firstIssue = result.error.issues[0];
        const firstErrorMessage = firstIssue.message || "Invalid input";
        return firstErrorMessage;
    }
    return result.data;
}
