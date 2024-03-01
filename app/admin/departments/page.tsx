"use client";
import DepartmentModal from "@/app/components/Admin/DepartmentModal";
import { useState, useEffect } from "react";

const DepartmentsPage = () => {
  const [Departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch departments from your API
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const response = await fetch("/api/departments");
    const data = await response.json();
    setDepartments(data);
  };

  const openModal = (Departments= null) => {
    setSelectedDepartments(Departments);
    setIsEditMode(!!Departments);
    setShowModal(true);
  };

  const handleSave = async (DepartmentsData) => {
    const url = DepartmentsData.id
      ? `/api/departments/${DepartmentsData.id}`
      : "/api/departments";
    const method = DepartmentsData.id ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(DepartmentsData),
    });

    if (response.ok) {
      // Refresh the department list
      fetchDepartments();
      setShowModal(false);
    } else {
      // Handle errors
      console.error("Failed to save the department");
    }
  };

  const handleDelete = async (DepartmentsId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );
    if (confirmed) {
      const response = await fetch(`/api/departments/${DepartmentsId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the department list
        fetchDepartments();
      } else {
        // Handle errors
        console.error("Failed to delete the department");
      }
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold">Manage Departments</h3>
      <button onClick={() => openModal()} className="btn btn-primary mt-4">
        Add Departments
      </button>
      <div className="overflow-x-auto mt-6">
        <table className="table w-full">
          {/* Table headers */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* department data */}
            {Departments.map((departments) => (
              <tr key={departments.id}>
                <td>{departments.name}</td>
                <td>{departments.code}</td>
                <td>
                  <button
                    onClick={() => openModal(departments)}
                    className="btn btn-xs btn-success text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(departments.id)}
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
        <DepartmentModal
          departments={selectedDepartments}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default DepartmentsPage;
