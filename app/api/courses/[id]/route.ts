import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const course = await prisma.course.findUnique({
    where: { id: parseInt(id, 10) },
  });
  return NextResponse.json(course);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const data = await request.json();
  const course = await prisma.course.update({
    where: { id: parseInt(id, 10) },
    data: {
      name: data.name,
      active: data.active,
      nickName: data.nickName,
      departmentId: data.departmentId,
      userId: data.userId,
    },
  });
  return NextResponse.json(course);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  await prisma.course.delete({
    where: { id: parseInt(id, 10) },
  });
  return new Response(null, { status: 204 });
}
