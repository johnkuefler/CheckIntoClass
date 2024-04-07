
import { useState } from "react";
import DepartmentDropdown from "../Dropdowns/DepartmentDropdown";

const CoursesModal = ({ course, onSave, onClose, isEditMode }) => {
    const [name, setName] = useState(course?.name || '');
    const [nickName, setNickName] = useState(course?.nickName|| '');
    const [departmentId, setDepartmentId] = useState(course?.departmentId || null);
    const [active, setActive] = useState(course?.active || null);

    const handleDepartmentChange = (selectedValue) => {
        setDepartmentId(selectedValue);
    }

    const handleSubmit = () => {
      var departmentIdAsInt = parseInt(departmentId);
      var activeAsBool = false;
      if (active === "on") {
        activeAsBool = true;
      }
      console.log(departmentIdAsInt);

      onSave({ ...course, name, nickName, active: activeAsBool, departmentId: departmentIdAsInt });
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} Course</h3>
          <input type="text" placeholder="Name" className="input input-bordered w-full my-2" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="NickName" className="input input-bordered w-full my-2" value={nickName} onChange={(e) => setNickName(e.target.value)} />
          
          <label className="label">Active</label>
          <input type="checkbox" placeholder="Active"  value={active} onChange={(e) => setActive(e.target.value)} />

          <label className="label">Department</label>
          <DepartmentDropdown onSelect={handleDepartmentChange}/>
          
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">Save</button>
            <button onClick={onClose} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CoursesModal;
  
