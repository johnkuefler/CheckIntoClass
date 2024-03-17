import { useEffect, useState } from "react";

const DepartmentDropdown = ({ value, onSelect }) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("/api/departments");
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleSelectChange = (event) => {
    const selectedDepartmentId = parseInt(event.target.value);
    onSelect(selectedDepartmentId);
  };

  return (
    <select
      className="select select-bordered w-full max-w-xs"
      aria-label="Select Department"
      value={value} // Set the selected value
      onChange={handleSelectChange} // Call onSelect when the selection changes
    >
      {departments.map((department) => (
        <option key={department.id} value={department.id}>
          {department.name}
        </option>
      ))}
    </select>
  );
};

export default DepartmentDropdown;