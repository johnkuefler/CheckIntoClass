import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const delegation = await prisma.delegation.findMany();
  return NextResponse.json(delegation);
}