import { useState } from "react";

const EnrollmentModal = ({ enrollment, onSave, onClose, isEditMode }) => {
    const [id, setId] = useState(enrollment?.studentID || '');
    const [name, setName] = useState(enrollment?.studentName || '');
    const [active, setActive] = useState(enrollment?.active || false); 
  
  
const handleSubmit =() =>{
    const activeAsBool = active; //convert checkbox value to boolean
    const updatedEnrollment = {
      ...enrollment, studentName: name, studentID: id, active: activeAsBool
    };
    onSave(updatedEnrollment);
    onClose();
  };
  const handleCancel = () => {
    onClose(); // Close the modal without saving changes
  };

    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{isEditMode ? 'Edit' : 'Add'} Enrollment</h3>
          <label htmlFor="studentId">Student Id</label>
          <input id="studentId" type="text" placeholder="Student Id" className="input input-bordered w-full my-2" value={id} onChange={(e) => setId(e.target.value)} />
          <label htmlFor="studentName">Student Name</label>
          <input id="studentName" type="text" placeholder="Student Name" className="input input-bordered w-full my-2" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="active">Active</label>
          <input id="active" type="checkbox" placeholder="Active" value={active} onChange={(e) => setActive(e.target.checked)}/>
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">Save</button>
            <button onClick={handleCancel} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EnrollmentModal;
  
