// app/api/enrollments/course/student/[id]/[studentId]/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string, studentId: string } }
) {
    const id = params.id;
    const studentId = params.studentId;
    const enrollmentsForCourse = await prisma.enrollment.findMany({
        where: { 
            courseId: parseInt(id, 10),
            studentID: studentId, 
        },
    });
    return NextResponse.json(enrollmentsForCourse);
}