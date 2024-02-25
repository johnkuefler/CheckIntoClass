import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const specialEvents = await prisma.specialEvent.findMany();
  return NextResponse.json(specialEvents);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, code, expireDateTime, courseId } = data;
  const specialEvent = await prisma.specialEvent.create({
    data: { name, code, expireDateTime, courseId },
  });
  return NextResponse.json(specialEvent);
}
