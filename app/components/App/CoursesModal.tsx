
import { useState, useEffect } from "react";
import DepartmentDropdown from "../Dropdowns/DepartmentDropdown";
import UsersDropdown from "../Dropdowns/UsersDropdown";

const CoursesModal = ({ course, onSave, onClose, isEditMode }) => {
    const [name, setName] = useState(course?.name || '');
    const [nickName, setNickName] = useState(course?.nickName|| '');
    const [departmentId, setDepartmentId] = useState(course?.departmentId || null);
    const [userId, setUserId] = useState(course?.userId || null);
    const [active, setActive] = useState(course?.active || null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleDepartmentChange = (selectedValue) => {
        setDepartmentId(selectedValue);
    }

    const handleUserChange = (currentUser) => {
        setUserId(currentUser);
        console.log(currentUser);
    }

    useEffect(() => {
      const getCurrentUser = async () => {
          try {
              const session = await getServerSession(authOptions);
              if (!session?.user?.email) return null;
              const currentUser = await prisma.user.findUnique({
                  where: { email: session.user.email },
              });
              return currentUser;
          } catch (error) {
              console.error("Error fetching current user:", error);
              return null;
          }
      };

      getCurrentUser().then(user => {
          setCurrentUser(user);
          setLoading(false); // Set loading to false when user data is fetched
      });
  }, []); // Empty dependency array to run only once on component mount


    const handleSubmit = () => {
      var departmentIdAsInt = parseInt(departmentId);
      var userIdAsInt = parseInt(userId);
      var activeAsBool = false;
      if (active === "on") {
        activeAsBool = true;
      }
      onSave({ ...course, name, nickName, active: activeAsBool, departmentId: departmentIdAsInt, userId: userIdAsInt });
    };

    if (loading) {
      return <div>Loading...</div>; // Display a loading indicator while fetching user data
    }
    
    return (
      <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} Course</h3>
        <input type="text" placeholder="Name" className="input input-bordered w-full my-2" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="NickName" className="input input-bordered w-full my-2" value={nickName} onChange={(e) => setNickName(e.target.value)} />
        
        <label className="label">Active</label>
        <input type="checkbox" placeholder="Active"  value={active} onChange={(e) => setActive(e.target.value)} />

        <label className="label">Department</label>
        <DepartmentDropdown onDepartmentChange={handleDepartmentChange}/>
        <label className="label">Instructor</label>
        console.log(currentUser);

        <div className="modal-action">
        <button onClick={handleSubmit} className="btn btn-primary">Save</button>
        <button onClick={onClose} className="btn">Cancel</button>
        </div>
      </div>
      </div>
    );
  };
  
  
  export default CoursesModal;
  
