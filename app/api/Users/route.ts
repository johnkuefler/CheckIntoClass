// app/api/Users/route.ts


import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";


const SALT_ROUNDS = 10; // Adjust this based on your security requirements


export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const {firstName,lastName,email,emailVerified,password,image,institutionId } = data;

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
  const users = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      emailVerified,
      password: hashedPassword,
      image,
      institutionId
    },
  });

  return NextResponse.json(users);
}
