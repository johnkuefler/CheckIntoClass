"use client";
import UserModal from "@/app/components/Admin/UsersModal";
import { useState, useEffect } from "react";

const UserPage = () => {
  const [Users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch Users from your API
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("/api/Users");
    const data = await response.json();
    setUsers(data);
  };

  const openModal = (User = null) => {
    setSelectedUser(User);
    setIsEditMode(!!User);
    setShowModal(true);
  };

  const handleSave = async (UserData) => {
    const url = UserData.id
    ? `/api/Users/${UserData.id}`
    : "/api/Users";
    const method = UserData.id ? "PUT" : "POST";

console.log(UserData);

  // Remove 'id' property from UserData before sending it to the server
    //const { id, institutionId, department, departmentUsers, ...dataWithoutInstitutionId } = UserData;

    // const updatedData = {
    //   ...dataWithoutInstitutionId,
    //   institution: { connect: { id: institutionId } },
    //   department: { connect: { id: department } },
    // };    
    const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UserData),
    });

    if (response.ok) {
      // Refresh the Users list
      fetchUsers();
      setShowModal(false);
    } else {
      // Handle errors
      console.error("Failed to save the User");
    }
  };

  const handleDelete = async (UserId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this User?"
    );
    if (confirmed) {
      const response = await fetch(`/api/Users/${UserId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the Users list
        fetchUsers();
      } else {
        // Handle errors
        console.error("Failed to delete the User");
      }
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold">Manage Users</h3>
      <button onClick={() => openModal()} className="btn btn-primary mt-4">
        Add User
      </button>
      <div className="overflow-x-auto mt-6">
        <table className="table w-full">
          {/* Table headers */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Institution</th>
              <th>Departments</th>
            </tr>
          </thead>
          <tbody>
            {/* Users data */}
            {Users.map((User) => (
              <tr key={User.userId}>
                <td>{User.firstName} {User.lastName}</td>
                <td>{User.institution.name}</td>
                <td>{User.departmentUsers[0]?.department?.name}</td>
                <td>
                  <button
                    onClick={() => openModal(User)}
                    className="btn btn-xs btn-success text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(User.userId)}
                    className="btn btn-xs btn-error ml-5 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <UserModal
          User={selectedUser}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default UserPage;
