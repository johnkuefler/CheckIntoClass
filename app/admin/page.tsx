const AdminPage = () => {
  
  return (
    <ul className="list-disc text-cyan-400 mx-auto">
      <li><a className="underline " href="#">Manage Users</a></li>
      <li><a className="underline" href="#">Manage Departments</a></li>
      <li><a className="underline" href="#">Data Exports</a></li>
      <li><a className="underline" href="/admin/institutions">Manage Institutions</a></li>
      <li><a className="underline" href="#">Delete Courses</a></li>
    </ul>
  );
};

export default AdminPage;
