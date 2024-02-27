"use client";

import { use, useEffect, useState } from "react";

const InstitutionsDropdown = () => {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      const response = await fetch("/api/institutions");
      const data = await response.json();
      setInstitutions(data);
    };

    fetchInstitutions();
  }, []);

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      aria-label="Select Institution"
    >
      {institutions.map((institution) => (
        <option key={institution.id} value={institution.id}>
          {institution.name}
        </option>
      ))}
    </select>
  );
};

export default InstitutionsDropdown;
