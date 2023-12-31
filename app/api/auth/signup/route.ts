import bcrypt from 'bcrypt';
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const SALT_ROUNDS = 10; // Adjust this based on your security requirements

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword }
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log({ error });
  }
}
