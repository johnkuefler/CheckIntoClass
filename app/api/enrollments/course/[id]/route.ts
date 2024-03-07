// app/api/enrollments/course/[id]/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    const course = await prisma.course.findUnique({
        where: { id: parseInt(id, 10) },
    });
    return NextResponse.json(course);
}