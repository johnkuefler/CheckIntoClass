import { useEffect, useState } from "react";

const InstitutionsDropdown = ({ value, onSelect }) => {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch("/api/institutions");
        const data = await response.json();
        setInstitutions(data);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };

    fetchInstitutions();
  }, []);

  const handleSelectChange = (event) => {
    const selectedInstitutionId = parseInt(event.target.value);
    onSelect(selectedInstitutionId);
  };

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      aria-label="Select Institution"
      value={value} // Set the selected value
      onChange={handleSelectChange} // Call onSelect when the selection changes
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
