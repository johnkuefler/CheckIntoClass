// /api/courses/instructor/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { id } = request.params as { id: string };

  const courses = await prisma.course.findMany({
    where: { userId: parseInt(id) },
  });

  return NextResponse.json(courses);
}
