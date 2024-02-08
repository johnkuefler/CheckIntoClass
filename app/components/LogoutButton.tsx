"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button className="btn btn-ghost text-base" onClick={() => signOut()}>
      Logout
    </button>
  );
};

export default LogoutButton;
