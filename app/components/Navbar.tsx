import React from 'react';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Check Into Class</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Manage Courses</a></li>
          <li><a>Admin</a></li>
          <li><a>Account</a></li>
          <li><LogoutButton/></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
