"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return <button className="btn btn-ghost" onClick={() => signOut()}>Log out!</button>;
};

export default LogoutButton;