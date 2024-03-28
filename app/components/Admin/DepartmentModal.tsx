import { useState } from "react";
import InstitutionsDropdown from "../Dropdowns/InstitutionsDropdown";

const DepartmentModal = ({ department, onSave, onClose, isEditMode }) => {
    const [name, setName] = useState(department?.name || '');
    const [code, setCode] = useState(department?.code || '');
    const [institutionId, setInstitutionId] = useState(department?.institutionId || null);

    const handleDropdownChange = (selectedValue) => {
      setInstitutionId(selectedValue);
    }
  
    const handleSubmit = () => {
      var institutionIdAsInt = parseInt(institutionId);
      onSave({ ...department, name, code, institutionId: institutionIdAsInt });
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-2xl">{isEditMode ? 'Edit' : 'Add'} Department</h3>
          <div className="label -mb-2">
            <span className="label-text">Department Name</span>
          </div>
          <input type="text" placeholder="Name" className="input input-bordered w-full my-2" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="label -mb-2">
            <span className="label-text">Department Code</span>
          </div>
          <input type="text" placeholder="Code" className="input input-bordered w-full my-2" value={code} onChange={(e) => setCode(e.target.value)} />
            <div className="label">
              <span className="label-text">Institution</span>
            </div>
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
  
