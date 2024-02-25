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
    const enrollment = await prisma.enrollment.update({
        where: { id: parseInt(id, 10) },
        data: data,
    });
    return NextResponse.json(enrollment);
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