// app/api/enrollments/[id]/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const enrollment = await prisma.enrollment.findUnique({
        where: { id: parseInt(id, 10) },
    });
    return NextResponse.json(enrollment);
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const data = await request.json();

    // Check if the student ID already exists for the given course ID
    const existingEnrollment = await prisma.enrollment.findFirst({
        where: {
            AND: [
                { courseId: data.courseId },
                { studentID: data.studentID } 
            ]
        }
    });

    if (existingEnrollment && existingEnrollment.id !== parseInt(id, 10)) {
        // If an enrollment with the same student ID already exists for the course, return an error response
        return new Response("Student ID already exists for this course", { status: 400 });
    }

    try {
        // continue with the enrollment if validation passes
        const enrollment = await prisma.enrollment.update({
            where: { id: parseInt(id, 10) },
            data: data,
        });
        
        return NextResponse.json(enrollment);
    } catch (error) {
        // Handle any other errors
        console.error("Error updating enrollment:", error);
        return new Response("Failed to update enrollment", { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    await prisma.enrollment.delete({
        where: { id: parseInt(id, 10) },
    });
    return new Response(null, { status: 204 });
}