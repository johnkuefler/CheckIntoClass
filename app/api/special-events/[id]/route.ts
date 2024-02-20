import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const specialEvent = await prisma.specialEvent.findUnique({
    where: { id: parseInt(id, 10) },
  });
  return NextResponse.json(specialEvent);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await request.json();
  const specialEvent = await prisma.specialEvent.update({
    where: { id: parseInt(id, 10) },
    data: data,
  });
  return NextResponse.json(specialEvent);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.specialEvent.delete({
    where: { id: parseInt(id, 10) },
  });
  return new Response(null, { status: 204 });
}
