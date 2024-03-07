"use client";

import { use, useEffect, useState } from "react";   

const UsersDropdown = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/Users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      aria-label="Select User"
    >
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.firstName} {user.lastName}
        </option>
      ))}
    </select>
  );
};

export default UsersDropdown;