import { z } from "zod";

export const DoctorProfileSchema = z.object({
    doctorId: z.string().min(1, "Doctor ID is required"),
    experience: z.number().int().min(0, "Experience must be a positive integer").max(70, "Experience cannot exceed 70 years"),
    specializations: z.array(z.string().min(1, "Specialization cannot be empty")).min(1, "At least one specialization is required"),
});

export type DoctorProfileInput = z.infer<typeof DoctorProfileSchema>;
