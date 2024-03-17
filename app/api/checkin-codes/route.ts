// app/api/checkin-codes/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import generateRandomCode from "@/lib/checkinCodeGenerator";

export async function GET(request: NextRequest) {
    const checkinCodes= await prisma.checkinCode.findMany();
    return NextResponse.json(checkinCodes);  
}

export async function POST(request: NextRequest) {
    const data = await request.json();
    const { courseId } = data;
    const code = generateRandomCode();
    const checkinCode = await prisma.checkinCode.create({
        data: { code, courseId },
    });
    return NextResponse.json(checkinCode);
  }
