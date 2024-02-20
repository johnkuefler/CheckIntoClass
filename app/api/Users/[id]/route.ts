// app/api/users/[id]/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const users = await prisma.user.findUnique({
    where: { id: parseInt(id, 10) },
  });
  return NextResponse.json(users);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await request.json();
  const users = await prisma.user.update({
    where: { id: parseInt(id, 10) },
    data: data,
  });
  return NextResponse.json(users);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.user.delete({
    where: { id: parseInt(id, 10) },
  });
  return new Response(null, { status: 204 });
}