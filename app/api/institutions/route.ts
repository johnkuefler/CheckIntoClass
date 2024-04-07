// app/api/institutions/route.ts

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const institutions = await prisma.institution.findMany();
  return NextResponse.json(institutions);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { id, name, code, imageUrl } = data;
  const institution = await prisma.institution.create({
    data: { id, name, code, imageUrl },
  });
  return NextResponse.json(institution);
}
