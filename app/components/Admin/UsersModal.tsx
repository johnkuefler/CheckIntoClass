import { useState } from "react";

const UserModal = ({ User, onSave, onClose, isEditMode }) => {
    const [name, setName] = useState(User?.name || '');
    const [institution, setInstitution] = useState(User?.institution || '');
    const [department, setDepartment] = useState(User?.department || '');
  
    const handleSubmit = () => {
      onSave({ ...User, institution, department });
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} User</h3>
          <input type="text" placeholder="Name" className="input input-bordered w-full my-2" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Institution" className="input input-bordered w-full my-2" value={institution} onChange={(e) => setInstitution(e.target.value)} />
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
  