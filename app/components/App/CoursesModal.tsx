
import { useState } from "react";
import DepartmentDropdown from "../Dropdowns/DepartmentDropdown";
import UsersDropdown from "../Dropdowns/UsersDropdown";

const CoursesModal = ({ course, onSave, onClose, isEditMode }) => {
    const [name, setName] = useState(course?.name || '');
    const [nickName, setNickName] = useState(course?.nickName|| '');
    const [departmentId, setDepartmentId] = useState(course?.departmentId || null);
    const [userId, setUserId] = useState(course?.userId || null);

    const handleDepartmentChange = (selectedValue) => {
        setDepartmentId(selectedValue);
    }

    const handleUserChange = (selectedValue) => {
        setUserId(selectedValue);
    }

    const handleSubmit = () => {
      var departmentIdAsInt = parseInt(departmentId);
      var userIdAsInt = parseInt(userId);
      onSave({ ...course, name, nickName, departmentId: departmentIdAsInt, userId: userIdAsInt });
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} Course</h3>
          <input type="text" placeholder="Name" className="input input-bordered w-full my-2" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="NickName" className="input input-bordered w-full my-2" value={nickName} onChange={(e) => setNickName(e.target.value)} />
          <DepartmentDropdown onDepartmentChange={handleDepartmentChange}/>
          <UsersDropdown onUserChange={handleUserChange}/>
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">Save</button>
            <button onClick={onClose} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CoursesModal;
  
