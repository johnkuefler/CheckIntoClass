// /api/courses/institution/[id].ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { id } = request.params as { id: string };

  const courses = await prisma.course.findMany({
    where: { institutionId: parseInt(id) },
  });

  return NextResponse.json(courses);
}
