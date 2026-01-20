import mongoose, { Schema, Document } from "mongoose";

export interface IClinic extends Document {
    doctorId: mongoose.Types.ObjectId;
    clinicName: string;
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    contactNumber: string;
    timing: {
        days: string[]; // e.g., ["Monday", "Tuesday", "Wednesday"]
        startTime: string; // e.g., "09:00 AM"
        endTime: string; // e.g., "05:00 PM"
    };
    facilities?: string[]; // e.g., ["X-Ray", "ECG", "Laboratory"]
    consultationFee?: number;
    stars: number;
    reviewsCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ClinicSchema: Schema = new Schema(
    {
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: "Doctor",
            required: [true, "Doctor ID is required"],
            index: true, // Index for faster queries
        },
        clinicName: {
            type: String,
            required: [true, "Clinic name is required"],
            trim: true,
            maxlength: [100, "Clinic name cannot exceed 100 characters"],
        },
        address: {
            street: {
                type: String,
                required: [true, "Street address is required"],
                trim: true,
            },
            city: {
                type: String,
                required: [true, "City is required"],
                trim: true,
            },
            state: {
                type: String,
                required: [true, "State is required"],
                trim: true,
            },
            pincode: {
                type: String,
                required: [true, "Pincode is required"],
                trim: true,
                match: [/^[0-9]{6}$/, "Please enter a valid 6-digit pincode"],
            },
        },
        contactNumber: {
            type: String,
            required: [true, "Contact number is required"],
            trim: true,
            match: [/^[0-9]{10}$/, "Please enter a valid 10-digit contact number"],
        },
        timing: {
            days: {
                type: [String],
                required: [true, "Working days are required"],
                enum: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                ],
            },
            startTime: {
                type: String,
                required: [true, "Start time is required"],
            },
            endTime: {
                type: String,
                required: [true, "End time is required"],
            },
        },
        facilities: {
            type: [String],
            default: [],
        },
        consultationFee: {
            type: Number,
            min: [0, "Consultation fee cannot be negative"],
        },
        stars: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        reviewsCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Compound index for efficient queries by doctor
ClinicSchema.index({ doctorId: 1, isActive: 1 });

// Export the model
const Clinic = mongoose.models.Clinic || mongoose.model<IClinic>("Clinic", ClinicSchema);

export default Clinic;
