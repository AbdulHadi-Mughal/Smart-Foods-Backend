import { z } from "zod";

/**
 * Schema for address data.
 * - Enforces required fields and formats.
 * - Trims and normalizes input.
 * - Rejects any extra properties.
 */

const postalCodeMessage = "Postal code must be a 5-digit number.";
export const addressSchema = z
  .object({
    house_building: z
      .string()
      .trim()
      .min(5, "House or Building No. must be at least 5 characters.")
      .max(100, "House or Building No. must be at most 100 characters.")
      .refine(
        (s) => /^[\p{L}0-9\s,.'\-#]+$/u.test(s),
        "House or Building No. contains invalid characters."
      ),

    street_area: z
      .string()
      .trim()
      .min(5, "Street or Area must be at least 5 characters.")
      .max(100, "Street or Area must be at most 100 characters.")
      .refine(
        (s) => /^[\p{L}0-9\s,.'\-#]+$/u.test(s),
        "Street or Area contains invalid characters."
      ),

    city: z
      .string()
      .trim()
      .min(2, "City must be at least 2 characters.")
      .max(50, "City must be at most 50 characters.")
      .refine(
        (s) => /^[\p{L}0-9\s,.'\-#]+$/u.test(s),
        "City contains invalid characters."
      ),

    province: z.enum([
      "Punjab",
      "Sindh",
      "Khyber Pakhtunkhwa",
      "Balochistan",
      "Islamabad Capital Territory",
      "Gilgit-Baltistan",
      "Azad Jammu and Kashmir",
    ]),
    postalCode: z
      .string()
      .trim()
      .length(5, "Postal code must be exactly 5 digits."),
  })
  .strict();

export type AddressForm = z.infer<typeof addressSchema>;

/**
 * Validate address input.
 * @param input – unknown data to validate
 * @returns AddressForm on success, or first error message string on failure
 */
export function validateAddress(input: unknown): AddressForm | string {
  const result = addressSchema.safeParse(input);
  if (!result.success) {
    const [first] = result.error.issues;
    return first.message;
  }
  return result.data;
}
