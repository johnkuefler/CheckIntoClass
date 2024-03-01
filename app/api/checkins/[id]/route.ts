
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
    return NextResponse.json(checkin);
}

export async function PUT(
    request: NextRequest, 
    { params }: { params: { id: string} }
) {
    const id = params.id;
    const data = await request.json();
    const checkin = await prisma.institution.update({
        where: { id: parseInt(id, 10) },
        data: data,
    });
    return NextResponse.json(checkin);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
){
    const id = params.id;
    await prisma.checkin.delete({
        where: { id: parseInt(id, 10) },
    });
    return new Response(null, { status: 204 });
}