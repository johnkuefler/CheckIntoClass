"use client";

import { useEffect, useState } from "react";

const EnrollmentPage = () => {
  const [courseId, setCourseId] = useState(0);
  const [enrollments, setEnrollments] = useState([]);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const courseId = Number(params.get("courseId")) || 0;
      console.log(courseId);
      setCourseId(courseId);

      // fetch course by id
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      setCourse(data);

      // fetch enrollments by course id
      const enrollments = await fetch(`/api/enrollments?courseId=${courseId}`);
      const enrollmentData = await enrollments.json();
      setEnrollments(enrollmentData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Enrollments for {course?.name}</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{enrollment.studentID}</td>
              <td className="px-6 py-4 whitespace-nowrap">{enrollment.studentName}</td>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <input type="checkbox" checked={enrollment.active} onChange={() => handleActiveChange(enrollment.id)} className="mr-2"/>
                <button onClick={() => OpenModel(enrollment)} className="mr-2">Edit</button>
                <button onClick={() => handleDelete(enrollment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnrollmentPage;
