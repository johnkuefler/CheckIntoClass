"use client";

import { useEffect, useState } from "react";
import EnrollmentModal from "@/app/components/Admin/EnrollmentModal";
import AddStudentModal from "@/app/components/App/AddStudentModal";
import { connect } from "http2";

const EnrollmentPage = () => {
  const [courseId, setCourseId] = useState(0);
  const [enrollments, setEnrollments] = useState([]);
  const [course, setCourse] = useState({});
  const [selectedEnrollment, setSelectedEnrollment] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const courseId = Number(params.get("courseId")) || 0;
      setCourseId(courseId);

      // fetch course by id
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      setCourse(data);

      // fetch enrollments by course id
      const enrollments = await fetch(`/api/enrollments?courseId=${courseId}`);
      const enrollmentData = await enrollments.json();
      console.log(enrollmentData);
      setEnrollments(enrollmentData);
    };

  const openModal = (enrollment = {} ) => {
    setSelectedEnrollment(enrollment);
    setIsEditMode(!!enrollment);
    setShowModal(true);
  };

  const openAddStudentModal = () => {
    setShowAddStudentModal(true);
  };

  const handleSave = async (enrollmentData) => {
    const url = enrollmentData.id
      ? `/api/enrollments/${enrollmentData.id}`
      : "/api/enrollments";
    const method = enrollmentData.id ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrollmentData),
    });

    if (response.ok) {
      // Refresh the enrollment list
      fetchData();
      setShowModal(false);
    } else {
      // Handle errors
      console.error("Failed to save the enrollment");
    }
  };

  const handleAddStudent = async (studentData, courseId) => {
    if (!courseId) {
      console.error("Course ID is undefined or null");
      return;
    }

    const url = studentData.id
      ? `/api/enrollments/${studentData.id}`
      : "/api/enrollments";
    const method = studentData.id ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...studentData, 
        course: { connect: { id: courseId } }, 
      }),
    });

    if (response.ok) {
      // Refresh the enrollment list
      fetchData();
      setShowAddStudentModal(false);
    } else {
      // Handle errors
      console.error("Failed to save the enrollment");
    }
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enrollment?"
    );
    if (confirmed) {
      const response = await fetch(`/api/enrollments/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the institutions list
        fetchData();
      } else {
        // Handle errors
        console.error("Failed to delete the enrollment");
      }
    }
  };


  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Enrollments for {course?.name}</h1>
      <button onClick={openAddStudentModal}className="btn btn-primary mt-4" >Add Student</button>
      <div className= "mt-6">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((enrollment) => (
            <tr key={enrollment?.id}>
              <td>{enrollment.studentID}</td>
              <td>{enrollment.studentName}</td>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                <input type="checkbox" checked={enrollment.active || false} disabled={true} className="mr-2"/>
              </td>
              <td>
              <details className="dropdown">
              <summary className="m-1 btn">Actions</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <a>
                        <button onClick={() => openModal(enrollment)} className="mr-2">Edit</button> 
                        </a>
                      </li>
                      <li>
                        <a><button onClick={() => handleDelete(enrollment?.id)}>Delete</button>
                         </a>
                      </li>
                      </ul>
                      </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {showModal && (
        <EnrollmentModal
          enrollment={selectedEnrollment}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          isEditMode={isEditMode}
        />
      )}

{showAddStudentModal && (
        <AddStudentModal
          enrollment={selectedEnrollment}
          onSave={(studentData) => handleAddStudent(studentData, course?.id)}
          onClose={() => setShowAddStudentModal(false)} 
          courseId={course?.id}
        />
      )}  
    </div>
  );
};

export default EnrollmentPage;
