import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const delegation = await prisma.delegation.findMany();
  return NextResponse.json(delegation);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, courseId, userId } = data;
  const delegation = await prisma.delegation.create({
    data: { name, courseId, userId },
  });
  return NextResponse.json(delegation);
}