import { z } from "zod";
export declare const addressSchema: z.ZodObject<{
    house_building: z.ZodString;
    street_area: z.ZodString;
    city: z.ZodString;
    province: z.ZodEnum<{
        Punjab: "Punjab";
        Sindh: "Sindh";
        "Khyber Pakhtunkhwa": "Khyber Pakhtunkhwa";
        Balochistan: "Balochistan";
        "Islamabad Capital Territory": "Islamabad Capital Territory";
        "Gilgit-Baltistan": "Gilgit-Baltistan";
        "Azad Jammu and Kashmir": "Azad Jammu and Kashmir";
    }>;
    postalCode: z.ZodString;
}, z.core.$strict>;
export type AddressForm = z.infer<typeof addressSchema>;
/**
 * Validate address input.
 * @param input – unknown data to validate
 * @returns AddressForm on success, or first error message string on failure
 */
export declare function validateAddress(input: unknown): AddressForm | string;
