import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!currentUser) return;
    return currentUser;
  } catch (e: any) {
    // simply ignores if no user is logged in
    return;
  }
};

import Image from "next/image";
import LogoutButton from "./components/LogoutButton";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user)
    return (
      <>
        <h3>You are currently not logged in!</h3>
        <Link href="/auth/login">Login to my account</Link>
      </>
    );

  return (
    <>
      <h3>Name: {user.firstName}</h3>
      <p>Email: {user.email}</p>
      <LogoutButton />
    </>
  );
}
