"use client";

import { useEffect, useState } from "react";

const CheckinPage = () => {
  const [courseId, setCourseId] = useState(0);
  const [checkinCode, setCheckinCode] = useState(null);
  const [countdown, setCountdown] = useState(30); // 30s timer

  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const courseIdParam = params.get("courseId");
      if (courseIdParam) {
        const courseId = parseInt(courseIdParam, 10);
        setCourseId(courseId);
      }
  }, []);

  useEffect(() => {
        if (!courseId) return;

        const fetchCheckinCode = async () => {
          const checkinResponse = await fetch(`/api/checkin-codes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ courseId: courseId }),
          });

          const checkinData = await checkinResponse.json();
          setCheckinCode(checkinData.code);
          setCountdown(30); // Reset countdown when new code is fetched
        };

        fetchCheckinCode(); // Fetch once on mount or courseId change

        const intervalId = setInterval(fetchCheckinCode, 30000); // refreshes every 30s

        // Start a second interval for the countdown timer
        const countdownId = setInterval(() => {
          setCountdown(current => current > 0 ? current - 1 : 30);
        }, 1000);

        return () => {
          clearInterval(intervalId); 
          clearInterval(countdownId); // cleanup
        };
  }, [courseId]); // Depend on courseId to restart interval when it changes

  return (
    <div>
      <h1>Checkin Code</h1>
      <br />
      <div>Next update in {countdown} seconds</div> {/* countdown timer! */}
      {checkinCode && (
        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=http://localhost:3000/psu?code=${checkinCode}`} alt="QR Code" />
      )}
      {checkinCode && <p className="text-3xl">{checkinCode}</p>}
    </div>
  );
};

export default CheckinPage;
