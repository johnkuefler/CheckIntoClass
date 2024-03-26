"use client";

import { use, useEffect, useState } from "react";

const DepartmentDropdown = ({ onDepartmentChange }) => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await fetch ("/api/departments");
            const data = await response.json();
            // insert an empty department at the beginning of the list
            data.unshift({ id: null, name: "Select Department" });
            setDepartments(data);
        };

        fetchDepartments();
    },[]);

    const handleDepartmentChange = (event) => {
        const selectedValue = event.target.value;
        onDepartmentChange(selectedValue);
    }

    return(
        <select
            className = "select select-bordered w-full max-w-xs"
            aria-label="Select Department"
            onChange={handleDepartmentChange}
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
