"use client"
import React, { useState } from 'react';

const CheckInForm = () => {
  const [studentId, setStudentId] = useState('');
  const [checkinCode, setCheckinCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
    setErrorMessage('');
  };

  const handleCheckinCodeChange = (e) => {
    setCheckinCode(e.target.value);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId && !checkinCode) {
      setErrorMessage('Student ID & Checkin Code must be provided');
      return;
    }

    if (!studentId) {
      setErrorMessage('Student ID must be provided');
      return;
    }

    if (!checkinCode) {
      setErrorMessage('Checkin Code must be provided');
      return;
    }

    const checkinCodeResponse = await fetch(`api/checkin-codes/code/${checkinCode}`); 
    const checkinCodeData = await checkinCodeResponse.json(); 

    if (!checkinCodeData) {
      alert('Invalid checkin code')
      return;
    }


    const studentEnrollmentResponse = await fetch(`api/enrollments/course/student/${checkinCodeData.courseId}/${studentId}`);
    const studentEnrollmentData = await studentEnrollmentResponse.json();

    console.log(studentEnrollmentData)

    if (!studentEnrollmentData) {
      alert('Invalid student ID')
      return;
    }

    const url = "api/checkins";
    const checkinData = {
        checkinCodeId: checkinCodeData.id,
        checkinCode,
        enrollmentId: studentEnrollmentData.id 
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...checkinData, 
      }),
    });

    if (response.ok) {
        // Reset form fields after submission
        setStudentId('');
        setCheckinCode('');

        alert('Checkin successful')
    } else {
      // Handle errors
      console.error("Failed to save the enrollment");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ 
        width: '345px', 
        height: '470px', 
        border: '1px solid lightgrey', 
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'}}>
        <h1 style={{ 
          textAlign: 'center', 
          margin: '1px',
          fontWeight: 550, 
          fontSize: 30, 
          fontFamily: 'Arial' }}>Check into class</h1>
        <img src="/psu_logo.png" style={{ 
          maxWidth: '50%', 
          padding: '10px' }} />
        <p style={{ 
          color: 'red',
          fontSize: '14px',
          textAlign: 'center',
          visibility: errorMessage ? 'visible' : 'hidden' }}>
          {errorMessage}
        </p>
        <form onSubmit={handleSubmit} style={{ 
          width: '80%', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' }}>
          <input type="text" placeholder="Student ID" value={studentId} onChange={handleStudentIdChange} style={{ 
            width: '100%', 
            marginBottom: '5px',
            margin:'10px',
            border: '1px solid lightgrey',
            borderRadius:'5px', 
            padding: '5px' }} />
          <input type="text" placeholder="Checkin Code" value={checkinCode} onChange={handleCheckinCodeChange} style={{
            width: '100%', 
            marginBottom: '5px',
            margin:'10px',
            border: '1px solid lightgrey',
            borderRadius:'5px', 
            padding: '5px'}} />
          <button type="submit" style={{ 
            width: '100%', 
            backgroundColor: 'red', 
            color: 'white',
            borderRadius: '5px',
            padding: '8px 0', 
            cursor: 'pointer',
            margin:'10px' }}>Submit</button>
        </form>
      </div>
    </main>
  );
};

export default CheckInForm;
