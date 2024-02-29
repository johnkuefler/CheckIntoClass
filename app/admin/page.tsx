const AdminPage = () => {
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Check Into Class - Admin</h1>
      <h2 className="text-2xl font-bold mt-2">Pittsburg State University</h2>
      <hr className="my-5" />
    <ul className="list-disc ml-5 mt-10">
      <li><a className="underline text-cyan-400" href="#">Manage Users</a></li>
      <li><a className="underline text-cyan-400" href="/admin/departments">Manage Departments</a></li>
      <li><a className="underline text-cyan-400" href="#">Data Exports</a></li>
      <li><a className="underline text-cyan-400" href="/admin/institutions">Manage Institutions</a></li>
      <li><a className="underline text-cyan-400" href="#">Delete Courses</a></li>
    </ul>
  </div>
  );
};

export default AdminPage;
