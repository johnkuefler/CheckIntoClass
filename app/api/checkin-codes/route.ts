// app/api/checkin-codes/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const checkinCodes= await prisma.checkinCode.findMany();
    return NextResponse.json(checkinCodes);
}

