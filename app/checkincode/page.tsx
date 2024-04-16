"use client";

import { useEffect, useState } from "react";

const CheckinCodePage = () => {
  const [courseId, setCourseId] = useState(0);
  const [enrollments, setEnrollments] = useState([]);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const courseId = params.get("courseId");
      setCourseId(courseId);

      // fetch course by id
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      setCourse(data);

      const checkinCodeResponse = await fetch(`/api/checkin-codes`)
      console.log(checkinCodeResponse);
      // fetch checkin code by course id
      // Ensure you have a similar fetch call here if needed
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Checkin Code</h1>
    </div>
  );
};

export default CheckinCodePage;