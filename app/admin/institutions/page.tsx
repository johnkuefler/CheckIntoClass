"use client";
import InstitutionModal from "@/app/components/Admin/InstitutionsModal";
import { useState, useEffect } from "react";

const InstitutionPage = () => {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch institutions from your API
    fetchInstitutions();
  }, []);

  const fetchInstitutions = async () => {
    const response = await fetch("/api/institutions");
    const data = await response.json();
    setInstitutions(data);
  };

  const openModal = (institution = null) => {
    setSelectedInstitution(institution);
    setIsEditMode(!!institution);
    setShowModal(true);
  };

  const handleSave = async (institutionData) => {
    const url = institutionData.id
      ? `/api/institutions/${institutionData.id}`
      : "/api/institutions";
    const method = institutionData.id ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(institutionData),
    });

    if (response.ok) {
      // Refresh the institutions list
      fetchInstitutions();
      setShowModal(false);
    } else {
      // Handle errors
      console.error("Failed to save the institution");
    }
  };

  const handleDelete = async (institutionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this institution?"
    );
    if (confirmed) {
      const response = await fetch(`/api/institutions/${institutionId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the institutions list
        fetchInstitutions();
      } else {
        // Handle errors
        console.error("Failed to delete the institution");
      }
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold">Manage Institutions</h3>
      <button onClick={() => openModal()} className="btn btn-primary mt-4">
        Add Institution
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
            {/* Institutions data */}
            {institutions.map((institution) => (
              <tr key={institution.id}>
                <td>{institution.name}</td>
                <td>{institution.code}</td>
                <td>
                  <button
                    onClick={() => openModal(institution)}
                    className="btn btn-xs btn-success"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(institution.id)}
                    className="btn btn-xs btn-error ml-5"
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
        <InstitutionModal
          institution={selectedInstitution}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default InstitutionPage;
