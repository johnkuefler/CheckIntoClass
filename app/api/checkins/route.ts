import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const checkins = await prisma.checkin.findMany();
  return NextResponse.json(checkins);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { checkinCodeId, enrollmentId } = data;
  const checkin = await prisma.checkin.create({
    data: { checkinCodeId, enrollmentId },
  });
  return NextResponse.json(checkin);
}
