// app/api/checkin-codes/code/[code]

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = params.code;
  const checkinCode = await prisma.checkinCode.findFirst({ 
    where: { code: code },
  });
  return NextResponse.json(checkinCode);
}
