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

import LogoutButton from "./components/LogoutButton";
import InstitutionsDropdown from "./components/Dropdowns/InstitutionsDropdown";
import UsersDropdown from "./components/Dropdowns/UsersDropdown";
import CourseManagement from "./components/App/CourseManagement";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user)
    return (
      <>
        <h3>You are currently not logged in!</h3>

        <a href="/auth/login" className="btn btn-primary">Login to my account</a>
      </>
    );

  return (
    <>
      <CourseManagement currentUser={user}/>
    </>
  );
}
