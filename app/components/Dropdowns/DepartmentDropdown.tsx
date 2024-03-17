"use client";

import { use, useEffect, useState } from "react";

const DepartmentDropdown = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await fetch ("/api/departments");
            const data = await response.json();
            setDepartments(data);
        };

        fetchDepartments();
    },[]);

    return(
        <select
            className = "select select-bordered w-full max-w-xs"
            aria-label="Select Department"
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