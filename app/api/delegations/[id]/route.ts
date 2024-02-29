import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const delegation = await prisma.delegation.findUnique({
    where: { id: parseInt(id, 10) },
  });
  return NextResponse.json(delegation);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await request.json();
  const delegation = await prisma.delegation.update({
    where: { id: parseInt(id, 10) },
    data: data,
  });
  return NextResponse.json(delegation);
}