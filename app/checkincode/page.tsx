"use client";

import { useEffect, useState } from "react";

const CheckinPage = () => {
  const [courseId, setCourseId] = useState(0);
  const [checkinCode, setCheckinCode] = useState(null);
  const [course, setCourse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(window.location.search);
      const courseIdParam = params.get("courseId");
      if (courseIdParam) {
        const courseId = parseInt(courseIdParam, 10);
        setCourseId(courseId);

        //fetch a checkin code via checkin-codes api route
        const checkinResponse = await fetch(`/api/checkin-codes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ courseId: courseId }),
        });

        const checkinData = await checkinResponse.json();
        setCheckinCode(checkinData.code);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Checkin Code</h1>
      <br></br>
      {checkinCode && <p className="text-3xl">{checkinCode}</p>}
    </div>
  );
};

export default CheckinPage;
