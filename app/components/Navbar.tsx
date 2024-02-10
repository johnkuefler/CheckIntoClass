import React from "react";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a><img
          src="check-into-class-logo.png"
          alt="Check Into Class Logo"
          height="30"
          width="30"
        /></a>
        <a href="/" className="btn btn-ghost text-xl">{" "}Check Into Class{" "}</a>
        <a href="/">Manage Courses</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Tools</a></li>
          <li><a href="/admin">Admin</a></li>
          <li><a href="#">Account</a></li>
          <li><a href="#">Help & Support</a></li>
          <li><LogoutButton /></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
