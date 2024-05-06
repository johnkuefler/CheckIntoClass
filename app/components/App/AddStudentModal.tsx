import { useState } from "react";

const AddStudentModal = ({ enrollment, onSave, onClose, courseId }) => {
    const [id, setId] = useState(enrollment?.studentID || '');
    const [name, setName] = useState(enrollment?.studentName || '');
    const [active, setActive] = useState(enrollment?.active || false); 
  
    const handleSubmit = () => {
      const isActive = active;
      onSave({ ...enrollment, studentName: name, studentID: id, active: isActive, courseId: courseId});
      onClose(); //close the modal after saving
    };

    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h2 className="font-bold text-2xl"> Create Enrollment</h2>
          <br/>
          <label> Student id must be in the format 0123456 (leading zero is required) </label>
          <br/>
          <label htmlFor="studentId">Student Id</label>
          <input id="studentId" 
                 type="text" 
                 placeholder="Student Id" 
                 className="input input-bordered w-full my-2" 
                 value={id} onChange={(e) => setId(e.target.value)}
                  />
          <label htmlFor="studentName">Student Name</label>
          <input id="studentName" 
                 type="text" 
                 placeholder="Student Name" 
                 className="input input-bordered w-full my-2" 
                 value={name} onChange={(e) => setName(e.target.value)}
                  />
          <label htmlFor="active">Active</label>
          <input id="active" 
                 type="checkbox" 
                 placeholder="Active" 
                 checked={active} onChange={(e) => setActive(e.target.checked)}
                 />
          <div className="modal-action">
            <button onClick={handleSubmit} className="btn btn-primary">Create</button>
            <button onClick={onClose} className="btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default AddStudentModal;
  
