// api/attendance/export.js or api/attendance/[courseId].js

import prisma from "@/app/lib/prisma"; // Adjust the import path as necessary

export default async function handler(req, res) {
  const { courseId } = req.query; // or use req.params.courseId for dynamic routing

  if (req.method === 'GET') {
    try {
      // Fetch attendance records from the database
      const attendanceRecords = await prisma.attendance.findMany({
        where: { courseId: Number(courseId) },
        include: {
          student: true, // assuming you have a relation to a student
          // other fields you might need
        },
      });

      // Logic to convert records to CSV/Excel format goes here

      // Set headers to prompt download on the client-side
      res.setHeader('Content-Type', 'text/csv'); // or application/vnd.openxmlformats-officedocument.spreadsheetml.sheet for Excel
      res.setHeader('Content-Disposition', 'attachment; filename=attendance-export.csv'); // Adjust filename as needed

      // Send the formatted data as the response
      res.send(formattedData);
    } catch (error) {
      console.error("Failed to export attendance:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Handle any non-GET requests
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
