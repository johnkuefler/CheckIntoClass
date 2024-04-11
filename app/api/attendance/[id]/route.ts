
import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
    request: NextRequest, 
    { params }: { params : { id: string } }
) {
    const id = params.id;
    const checkin = await prisma.checkin.findUnique({
        where: { id: parseInt(id, 10) },
    });
    
    const enrollments = await prisma.enrollment.findUnique({
        where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({checkin, enrollments});
}
