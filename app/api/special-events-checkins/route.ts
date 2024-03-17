import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const specialEventCheckins = await prisma.specialEventCheckin.findMany();
    return NextResponse.json(specialEventCheckins);
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { specialEventId, enrollmentId } = data;
    const specialEventCheckin = await prisma.specialEventCheckin.create({
        data: { specialEventId, enrollmentId },
    });
    return NextResponse.json(specialEventCheckin);
}