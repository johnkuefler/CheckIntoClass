"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return <button onClick={() => signOut()}>Log out</button>;
};

export default LogoutButton;