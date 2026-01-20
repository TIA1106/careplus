import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectDB } from "@/lib/database/db";
import Clinic from "@/lib/models/Clinic";
import { ClinicUpdateSchema } from "@/lib/validations/clinic";

// PUT /api/v1/clinic/[clinicId] - Update clinic
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ clinicId: string }> }
) {
    try {
        const { clinicId } = await params;
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token || !token.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // Validate with Zod
        const validation = ClinicUpdateSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validation.error.issues.map(err => err.message).join(", ")
                },
                { status: 400 }
            );
        }

        await connectDB();

        // Find clinic and verify ownership
        const clinic = await Clinic.findOne({
            _id: clinicId,
            doctorId: token.id,
            isActive: true,
        });

        if (!clinic) {
            return NextResponse.json({ error: "Clinic not found" }, { status: 404 });
        }

        // Update clinic
        const updatedClinic = await Clinic.findByIdAndUpdate(
            clinicId,
            { $set: validation.data },
            { new: true, runValidators: true }
        );

        return NextResponse.json(
            { message: "Clinic updated successfully", clinic: updatedClinic },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Error updating clinic:", error);

        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err: any) => err.message);
            return NextResponse.json({ error: messages.join(", ") }, { status: 400 });
        }

        return NextResponse.json(
            { error: "Failed to update clinic" },
            { status: 500 }
        );
    }
}

// DELETE /api/v1/clinic/[clinicId] - Soft delete clinic
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ clinicId: string }> }
) {
    try {
        const { clinicId } = await params;
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });

        if (!token || !token.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();

        // Find clinic and verify ownership
        const clinic = await Clinic.findOne({
            _id: clinicId,
            doctorId: token.id,
            isActive: true,
        });

        if (!clinic) {
            return NextResponse.json({ error: "Clinic not found" }, { status: 404 });
        }

        // Soft delete
        await Clinic.findByIdAndUpdate(clinicId, { isActive: false });

        return NextResponse.json(
            { message: "Clinic deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting clinic:", error);
        return NextResponse.json(
            { error: "Failed to delete clinic" },
            { status: 500 }
        );
    }
}
