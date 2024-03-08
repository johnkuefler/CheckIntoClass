import { useState } from "react";
import InstitutionsDropdown from "../Dropdowns/InstitutionsDropdown";
import DepartmentDropdown from "../Dropdowns/DepartmentDropdown";

const UserModal = ({ User, onSave, onClose, isEditMode }) => {
    const [firstName, setfirstName] = useState(User?.firstName || '');
    const [lastName, setlastName] = useState(User?.lastName || '');
    const [institutionId, setInstitutionId] = useState(User?.institutionId || {});
    const [department, setDepartment] = useState(User?.department || '');
    const [email, setEmail] = useState(User?.email || '');
    const [password, setPassword] = useState(User?.password || '');  
    const handleSubmit = () => {
      onSave({ ...User, institutionId, department, firstName, lastName, email, password}); 
      
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} User</h3>
          <input type="text" placeholder="First Name" className="input input-bordered w-full my-2" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" className="input input-bordered w-full my-2" value={lastName} onChange={(e) => setlastName(e.target.value)} />
          <input type="text" placeholder="Email" className="input input-bordered w-full my-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="input input-bordered w-full my-2" value={password} onChange={(e) => setPassword(e.target.value)} />
         
          <InstitutionsDropdown value={institutionId.id} onSelect={(selectedInstitution) => setInstitutionId(selectedInstitution)} />


          <DepartmentDropdown value={department.id} onSelect={(selectedDepartment) => setDepartment(selectedDepartment)} />
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">Save</button>
            <button onClick={onClose} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserModal;
  