// app/api/checkin-codes/code/[code]

import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = params.code;
  // Checkin Codes are not guarenteed to be unique however are pretty much so
  // To look up a checkin code by the code I used find many and grabbed the last code from that list
  // Choosing the last code means choosing the latest code date wise
  const checkinCode = await prisma.checkinCode.findMany({ 
    take: -1, // I HATE WHAT PYTHON HAS DONE TO THIS WORLD
    where: { code: code },
  });
  return NextResponse.json(checkinCode);
}
