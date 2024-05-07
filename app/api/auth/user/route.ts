import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import prisma from "@/app/lib/prisma";

const getCurrentUser = async (request) => {
  try {
    const session = await getServerSession(request, null, authOptions);
    if (!session?.user?.email) return null;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        // Ensure Date fields are converted to strings
        createdAt: true,
        updatedAt: true,
      }
    });
    if (!currentUser) return null;
    // Convert Dates to ISO strings for serialization
    currentUser.createdAt = currentUser.createdAt.toISOString();
    currentUser.updatedAt = currentUser.updatedAt.toISOString();
    return currentUser;
  } catch (e) {
    console.error("Error in getCurrentUser:", e);
    return null;
  }
};

export async function GET(request: NextRequest) {
  const user = await getCurrentUser(request);
  if (!user) {
    return new Response(null, { status: 404 });
  }
  return new Response(JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  });
}
