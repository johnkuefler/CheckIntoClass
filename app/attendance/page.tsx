"use client";
import UserModal from "@/app/components/Admin/UsersModal";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const AttendancePage = () => {
  const [courseId, setCourseId] = useState(0);
  const [course, setCourse] = useState({});
  const [attendanceData, setAttendanceData] = useState({});

  const fetchData = async () => {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("courseId");
    setCourseId(courseId);

    const courseResponse = await fetch(`/api/courses/${courseId}`);
    const courseData = await courseResponse.json();
    setCourse(courseData);

    // Fetch attendance data by courseId
    const response = await fetch(`/api/attendance/${courseId}`);
    const data = await response.json();

    console.log(data);

    setAttendanceData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (checkinId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this enrollment?"
    );
    if (confirmed) {
      const response = await fetch(`/api/attendance/${checkinId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      } else {
        // Handle errors
        console.error("Failed to delete the checkin");
      }
    }
  };

  return (
    <div>
      <h3 className="text-3xl font-semibold">Attendance for {course.name}</h3>
      <div className="overflow-x-auto mt-6">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Checkin Code</th>
              <th>Checkin Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData?.checkins?.map((checkin) => (
              <tr key={checkin.id}>
                <td>{checkin.enrollment.studentName}</td>
                <td>{checkin.enrollment.studentID}</td>
                <td>{checkin.checkinCode.code}</td>
                <td>{new Date(checkin.createdAt).toLocaleString()}</td>
                <td>
                  <button className="btn btn-xs btn-error ml-5 text-white" onClick={() => handleDelete(checkin.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendancePage;
