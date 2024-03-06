import { useState } from "react";
import InstitutionsDropdown from "../Dropdowns/InstitutionsDropdown";

const DepartmentModal = ({ department, onSave, onClose, isEditMode }) => {
    const [name, setName] = useState(department?.name || '');
    const [code, setCode] = useState(department?.code || '');
    const [institution, setInstitution] = useState(department?.institution?.id || null);

    const handleDropdownChange = (selectedValue) => {
        setInstitution(selectedValue);
    }
  
    const handleSubmit = () => {
      onSave({ ...department, name, code , institution });
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} Department</h3>
          <input type="text" placeholder="Name" className="input input-bordered w-full my-2" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Code" className="input input-bordered w-full my-2" value={code} onChange={(e) => setCode(e.target.value)} />
          <InstitutionsDropdown onInstitutionChange={handleDropdownChange}/>
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">Save</button>
            <button onClick={onClose} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DepartmentModal;
  
