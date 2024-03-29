import { useState } from "react";

const InstitutionModal = ({ institution, onSave, onClose, isEditMode }) => {
    const [name, setName] = useState(institution?.name || '');
    const [code, setCode] = useState(institution?.code || '');
  
    const handleSubmit = () => {
      onSave({ ...institution, name, code });
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} Institution</h3>
          <input type="text" placeholder="Name" className="input input-bordered w-full my-2" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Code" className="input input-bordered w-full my-2" value={code} onChange={(e) => setCode(e.target.value)} />
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">Save</button>
            <button onClick={onClose} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default InstitutionModal;
  