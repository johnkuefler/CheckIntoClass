import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";




export async function GET(request: NextResponse) {
    
        const enrollments = await prisma.enrollment.findMany();
        const checkins = await prisma.checkin.findMany();
        return NextResponse.json({ enrollments, checkins });
    
};

    
