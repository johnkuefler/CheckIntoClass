"use client";
import { useState, useEffect } from "react";
import CoursesModal from "@/app/components/App/CoursesModal";
import getUser from "@/lib/getUser";

const CourseManagement = ({ currentUser }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch courses from your API
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    // cannot currently verify that this works
    const response = await fetch(`/api/courses/instructors/${currentUser.id}`);
    let data = await response.json();
    if (data == null) {
      data = [];
    }

    setCourses(data);
  };

  const openModal = (course = null) => {
    setSelectedCourse(course);
    setIsEditMode(!!course);
    setShowModal(true);
  };

  const handleSave = async (courseData) => {
    console.log(courseData);

    const url = courseData.id
      ? `/api/courses/${courseData.id}`
      : "/api/courses";
    const method = courseData.id ? "PUT" : "POST";

    let userData = await getUser();
    courseData.userId = userData.id;

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    if (response.ok) {
      // Refresh the list
      fetchCourses();
      setShowModal(false);
    } else {
      // Handle errors
      console.error("Failed to save the course");
    }
  };

  const handleDelete = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirmed) {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the courses list
        fetchCourses();
      } else {
        // Handle errors
        console.error("Failed to delete the course");
      }
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold">Manage Courses</h3>
      <button onClick={() => openModal()} className="btn btn-primary mt-4">
        Add Course
      </button>
      <div className="mt-6">
        <table className="table w-full">
          {/* Table headers */}
          <thead>
            <tr>
              <th>Name</th>
              <th>NickName</th>
              <th>Department</th>
              <th>Instructor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Institutions data */}
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.name}</td>
                <td>{course.nickName}</td>
                <td>{course.department.name}</td>
                <td>
                  {course.user.firstName} {course.user.lastName}
                </td>
                <td>
                  <details className="dropdown">
                    <summary className="m-1 btn">Actions</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <a href={`/enrollment?courseId=${course.id}`}>
                          Edit Enrollment
                        </a>
                      </li>
                      <li>
                        <a href={`/checkincode?checkinCode=${course.id}`}>
                          Generate New Checkin Code</a>
                      </li>
                      <li>
                        <a>View Attendance</a>
                      </li>
                      <li>
                        <a>Export Attendance</a>
                      </li>
                      <li>
                        <a onClick={() => openModal(course)}>Edit</a>
                      </li>
                      <li>
                        <a onClick={() => handleDelete(course.id)}>Delete</a>
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
        <CoursesModal
          course={selectedCourse}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
};

export default CourseManagement;
