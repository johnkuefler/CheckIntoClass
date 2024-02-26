import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const courses = await prisma.course.findMany();
  return NextResponse.json(courses);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { name, active, nickName, departmentId } = data;
  const course = await prisma.course.create({
    data: { name, active, nickName, departmentId },
  });
  return NextResponse.json(course);
}
