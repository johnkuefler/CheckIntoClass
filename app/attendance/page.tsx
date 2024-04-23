"use client";
import UserModal from "@/app/components/Admin/UsersModal";
import { useState, useEffect } from "react";
import { format } from "date-fns";

  const AttendancePage = () => {
    const [courseId, setCourseId] = useState(0);
    const [course, setCourse] = useState({});
    const [attendanceData, setAttendanceData] = useState({ checkin: {}, enrollments: [] });
  
    useEffect(() => {
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
  
        // Format the date strings in the data
        const formattedData = {
          ...data,
          checkin: {
            ...data.checkin,
            createdAt: format(new Date(data.checkin.createdAt), "yyyy-MM-dd HH:mm:ss")
          },
          enrollments: data.enrollments.map(enrollment => ({
            ...enrollment,
            createdAt: format(new Date(enrollment.createdAt), "yyyy-MM-dd HH:mm:ss"),
            updatedAt: format(new Date(enrollment.updatedAt), "yyyy-MM-dd HH:mm:ss")
          }))
        };
  
        setAttendanceData(formattedData);
      };
  
      fetchData();
    }, []);


  return (
    <div>
      <h3 className="text-3xl font-semibold">Attendance for {course.name}</h3>
      <div className="overflow-x-auto mt-6">
        <table className="table w-full">
          {/* Table headers */}
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Checkin ID</th>
              <th>Checkin Time</th>
            </tr>
          </thead>
          <tbody>
          {attendanceData.enrollments.map((data) => (
            <tr key={data.id}>
              <td>{data.studentName}</td>
              <td>{data.studentID}</td>
              <td>{attendanceData.checkin.id}</td>
              <td>{attendanceData.checkin.createdAt}</td>
            </tr>
          ))}
          </tbody>      
      </table>
      </div>
    </div>
  );
};

export default AttendancePage;
