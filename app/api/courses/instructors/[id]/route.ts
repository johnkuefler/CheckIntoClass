import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const instructorCourses = await prisma.course.findMany({
    where: { userId: parseInt(id, 10) },
    include: {
        department: true,
        user: true
    },
  });
  return NextResponse.json(instructorCourses);
}