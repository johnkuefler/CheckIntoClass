
import prisma from "@/app/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
    request: NextRequest, 
    { params }: { params : { id: string } }
) {
    const id = params.id;

    const checkins = await prisma.checkin.findMany({
        where: {
          checkinCode: {
            courseId: parseInt(id, 10)
          }
        },
        include: {
          checkinCode: true, // include checkin code details
          enrollment: {
            include: {
              specialEventCheckins: true // include special event checkins within enrollments
            }
          }
        }
      });

    return NextResponse.json({checkins});
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id;
    await prisma.checkin.delete({
        where: { id: parseInt(id, 10) },
    });
    return new Response(null, { status: 204 });
}
