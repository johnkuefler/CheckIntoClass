// app/api/institutions/[id]/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const checkinCode = await prisma.checkinCode.findUnique({
    where: { id: parseInt(id, 10) },
  });
  return NextResponse.json(checkinCode);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await request.json();
  const checkinCode = await prisma.checkinCode.update({
    where: { id: parseInt(id, 10) },
    data: data,
  });
  return NextResponse.json(checkinCode);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.checkinCode.delete({
    where: { id: parseInt(id, 10) },
  });
  return new Response(null, { status: 204 });
}
