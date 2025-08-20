"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressSchema = void 0;
exports.validateAddress = validateAddress;
const zod_1 = require("zod");
/**
 * Schema for address data.
 * - Enforces required fields and formats.
 * - Trims and normalizes input.
 * - Rejects any extra properties.
 */
const postalCodeMessage = "Postal code must be a 5-digit number.";
exports.addressSchema = zod_1.z
    .object({
    house_building: zod_1.z
        .string()
        .trim()
        .min(5, "House or Building No. must be at least 5 characters.")
        .max(100, "House or Building No. must be at most 100 characters.")
        .refine((s) => /^[\p{L}0-9\s,.'\-#]+$/u.test(s), "House or Building No. contains invalid characters."),
    street_area: zod_1.z
        .string()
        .trim()
        .min(5, "Street or Area must be at least 5 characters.")
        .max(100, "Street or Area must be at most 100 characters.")
        .refine((s) => /^[\p{L}0-9\s,.'\-#]+$/u.test(s), "Street or Area contains invalid characters."),
    city: zod_1.z
        .string()
        .trim()
        .min(2, "City must be at least 2 characters.")
        .max(50, "City must be at most 50 characters.")
        .refine((s) => /^[\p{L}0-9\s,.'\-#]+$/u.test(s), "City contains invalid characters."),
    province: zod_1.z.enum([
        "Punjab",
        "Sindh",
        "Khyber Pakhtunkhwa",
        "Balochistan",
        "Islamabad Capital Territory",
        "Gilgit-Baltistan",
        "Azad Jammu and Kashmir",
    ]),
    postalCode: zod_1.z
        .string()
        .trim()
        .length(5, "Postal code must be exactly 5 digits."),
})
    .strict();
/**
 * Validate address input.
 * @param input – unknown data to validate
 * @returns AddressForm on success, or first error message string on failure
 */
function validateAddress(input) {
    const result = exports.addressSchema.safeParse(input);
    if (!result.success) {
        const [first] = result.error.issues;
        return first.message;
    }
    return result.data;
}
