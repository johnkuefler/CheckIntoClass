// app/api/users/route.ts

import bcrypt from "bcrypt";
import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";


const SALT_ROUNDS = 10; // Adjust this based on your security requirements


export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({



    include: {
      institution: true,
      departmentUsers: {
        select: {
          departmentId: true,
          department: {
            select: {
              name: true,
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

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
  const users = await prisma.user.create({
    data: {
      id,
      firstName,
      lastName,
      email,
      emailVerified,
      password: hashedPassword,
      image,
      institutionId,
      
    },
    include: {
      
      
      departmentUsers: {
        select: {
          departmentId: true,
        },
      },
    },
    
  });

  return NextResponse.json(users);
}
