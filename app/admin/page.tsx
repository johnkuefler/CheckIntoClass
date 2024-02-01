const AdminPage = () => {
  
  return (
    <ul className="list-disc mx-auto">
      <li><a className="underline text-cyan-400" href="#">Manage Users</a></li>
      <li><a className="underline text-cyan-400" href="#">Manage Departments</a></li>
      <li><a className="underline text-cyan-400" href="#">Data Exports</a></li>
      <li><a className="underline text-cyan-400" href="/admin/institutions">Manage Institutions</a></li>
      <li><a className="underline text-cyan-400" href="#">Delete Courses</a></li>
    </ul>
  );
};

export default AdminPage;
