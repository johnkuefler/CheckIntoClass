// app/api/enrollments/course/student/[id]/[studentId]/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string, studentId: string } }
) {
    const id = params.id;
    const studentId = params.studentId;
    // There should only be one student per id enrolled in a class so this find many will always return a length 1 array unless an error occurs
    const enrollmentsForCourse = await prisma.enrollment.findMany({
        take: -1,
        where: { 
            courseId: parseInt(id, 10),
            studentID: studentId, 
        },
    });
    // Want to check if this will work when the database is back online 
    return NextResponse.json(enrollmentsForCourse)/*[0]*/;
}