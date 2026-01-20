import { z } from "zod";

export const ClinicSchema = z.object({
    clinicName: z.string().min(3, "Clinic name must be at least 3 characters").max(100, "Clinic name too long"),
    address: z.object({
        street: z.string().min(1, "Street is required"),
        city: z.string().min(1, "City is required"),
        state: z.string().min(1, "State is required"),
        pincode: z.string().regex(/^[0-9]{6}$/, "Invalid pincode (must be 6 digits)"),
    }),
    contactNumber: z.string().regex(/^[0-9]{10}$/, "Invalid contact number (must be 10 digits)"),
    timing: z.object({
        days: z.array(z.enum([
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ])).min(1, "Select at least one working day"),
        startTime: z.string().min(1, "Start time is required"),
        endTime: z.string().min(1, "End time is required"),
    }),
    facilities: z.array(z.string()).optional(),
    consultationFee: z.number().min(0, "Fee cannot be negative").optional(),
    stars: z.number().min(0).max(5).optional(),
    reviewsCount: z.number().int().min(0).optional(),
});

export type ClinicInput = z.infer<typeof ClinicSchema>;

export const ClinicUpdateSchema = ClinicSchema.partial();
