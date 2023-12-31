// app/api/institutions/[id]/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const institution = await prisma.institution.findUnique({
    where: { id: parseInt(id, 10) },
  });
  return NextResponse.json(institution);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await request.json();
  const institution = await prisma.institution.update({
    where: { id: parseInt(id, 10) },
    data: data,
  });
  return NextResponse.json(institution);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.institution.delete({
    where: { id: parseInt(id, 10) },
  });
  return new Response(null, { status: 204 });
}
