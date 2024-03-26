// app/api/users/route.ts

import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";


const SALT_ROUNDS = 10; // Adjust this based on your security requirements



export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({

    include: {
      institution: { 
        select: {
          name: true,

        },
      },
      departmentUsers: {
        select: {
          departmentId: true,
          department: {
            select: {
              name: true,
              id: true,
              code: true,
              institutionId: true,
            },
          },
        },
      },
    },
  
  });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  const {id, firstName, lastName, email, emailVerified, password, image, institutionId, departmentId} = data;

  const departmentIds = [departmentId];
  console.log(departmentIds);
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
  const users = await prisma.user.create({
    data: {

      firstName,
      lastName,
      email,
      emailVerified,
      password: hashedPassword,
      image,
      institutionId: institutionId,
      departmentUsers: {
        createMany: {
          data: departmentIds.map(departmentId => ({
            departmentId
          })),
        },
      },    },

    
  });

  return NextResponse.json(users);
}
