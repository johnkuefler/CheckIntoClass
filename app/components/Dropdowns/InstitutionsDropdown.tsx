import { useEffect, useState, Fragment } from "react";

const InstitutionsDropdown = ({ value, onSelect }) => {

  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      const response = await fetch("/api/institutions");
      const data = await response.json();
      data.unshift({ id: null, name: "Select Institution" });
      setInstitutions(data);
    };

    fetchInstitutions();
  }, []);

  const handleSelectChange = (event) => {
    const selectedInstitutionId = parseInt(event.target.value);
    onSelect(selectedInstitutionId);
  };

  return (
    <Fragment>
    <label htmlFor="institutionDropdown" className="label">Institution</label>
    <select
      className="select select-bordered w-full max-w-xs"
      aria-label="Select Institution"
      value={value} // Set the selected value
      onChange={handleSelectChange} // Call onSelect when the selection changes
      id="institutionDropdown"
    >
      {institutions.map((institution) => (
        <option key={institution.id} value={institution.id}>
          {institution.name}
        </option>
      ))}
    </select>
    </Fragment>
  );
};

export default InstitutionsDropdown;
