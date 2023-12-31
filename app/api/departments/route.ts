import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const departments = await prisma.department.findMany();
  return NextResponse.json(departments);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, code, institutionId } = data;
  const department = await prisma.department.create({
    data: { name, code, institutionId },
  });
  return NextResponse.json(department);
}
