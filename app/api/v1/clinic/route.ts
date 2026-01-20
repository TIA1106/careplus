import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/database/db";
import Clinic from "@/lib/models/Clinic";
import { ClinicSchema } from "@/lib/validations/clinic";

// GET /api/v1/clinic - Get all clinics for logged-in doctor
export async function GET(req: NextRequest) {
    try {
        // Get authenticated user
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token || !token.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // Get all active clinics for this doctor
        const clinics = await Clinic.find({
            doctorId: token.id,
            isActive: true,
        }).sort({ createdAt: -1 }); // Most recent first

        return NextResponse.json({ clinics }, { status: 200 });
    } catch (error) {
        console.error("Error fetching clinics:", error);
        return NextResponse.json(
            { error: "Failed to fetch clinics" },
            { status: 500 }
        );
    }
}

// POST /api/v1/clinic - Create a new clinic
export async function POST(req: NextRequest) {
    try {
        // Get authenticated user
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token || !token.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // Validate with Zod
        const validation = ClinicSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validation.error.issues.map(err => err.message).join(", ")
                },
                { status: 400 }
            );
        }

        const {
            clinicName,
            address,
            contactNumber,
            timing,
            facilities,
            consultationFee,
            stars,
            reviewsCount,
        } = validation.data;

        await connectDB();

        // Create new clinic
        const clinic = await Clinic.create({
            doctorId: token.id,
            clinicName,
            address,
            contactNumber,
            timing,
            facilities: facilities || [],
            consultationFee: consultationFee || 0,
            stars: stars || 0,
            reviewsCount: reviewsCount || 0,
            isActive: true,
        });

        return NextResponse.json(
            { message: "Clinic added successfully", clinic },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating clinic:", error);

        // Handle validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err: any) => err.message);
            return NextResponse.json(
                { error: messages.join(", ") },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create clinic" },
            { status: 500 }
        );
    }
}
