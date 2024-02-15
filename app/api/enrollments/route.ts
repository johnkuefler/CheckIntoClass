// app/api/enrollments/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextResponse) {
    const enrollments = await prisma.enrollment.findMany();
    return NextResponse.json(enrollments);
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { active, studentID, studentName, courseId } = data;
    const enrollment = await prisma.enrollment.create({
        data: { active, studentID, studentName, courseId },
    });
    return NextResponse.json(enrollment);
}
