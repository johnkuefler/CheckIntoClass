import { useState } from "react";
import InstitutionsDropdown from "../Dropdowns/InstitutionsDropdown";

const UserModal = ({ User, onSave, onClose, isEditMode }) => {
    const [firstName, setfirstName] = useState(User?.firstName || '');
    const [lastName, setlastName] = useState(User?.lastName || '');
    const [institution, setInstitution] = useState(User?.institution || '');
    const [department, setDepartment] = useState(User?.department || '');
    const [email, setEmail] = useState(User?.email || '');
    const [password, setPassword] = useState(User?.password || '');  
    const handleSubmit = () => {
      onSave({ ...User, institution, department, firstName, lastName, email, password}); 
      
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} User</h3>
          <input type="text" placeholder="First Name" className="input input-bordered w-full my-2" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
          <input type="text" placeholder="Last Name" className="input input-bordered w-full my-2" value={lastName} onChange={(e) => setlastName(e.target.value)} />
          <input type="text" placeholder="Email" className="input input-bordered w-full my-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="input input-bordered w-full my-2" value={password} onChange={(e) => setPassword(e.target.value)} />
         
          <InstitutionsDropdown value={institution.id} onSelect={(selectedInstitution) => setInstitution(selectedInstitution)} />

          <input type="text" placeholder="Department" className="input input-bordered w-full my-2" value={department} onChange={(e) => setDepartment(e.target.value)} />
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">Save</button>
            <button onClick={onClose} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserModal;
  