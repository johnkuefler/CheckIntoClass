// app/api/enrollments/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextResponse) {
    const enrollments = await prisma.enrollment.findMany();
    return NextResponse.json(enrollments);
}

export async function POST(request: NextRequest) {
try {
    const data = await request.json();
    const { active, studentID, studentName, courseId } = data;
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
        return NextResponse.json({ error: 'Invalid courseId' }, { status: 400 });
    }
    console.log(data);
    const enrollment = await prisma.enrollment.create({
        data: { active, studentID, studentName, course: { connect: { id: courseId } } },
    });
    return NextResponse.json(enrollment);
} catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message });
}
}