import React, { useState } from 'react'
import TutorForm from './TutorForm'
import StudentForm from './StudentForm'

function Registration() {
  const [showStudentForm, setShowStudentForm] = useState<boolean>(true);
  const [showTutorForm, setShowTutorForm] = useState<boolean>(false);

  const handleStudentForm = () => {
    setShowStudentForm(true);
    setShowTutorForm(false);
  };

  const handleTutorForm = () => {
    setShowStudentForm(false);
    setShowTutorForm(true);
  };
  return (
   <div className=" w-full">
     <div className="flex justify-center  mt-9 mb-6">
      <h1 className="font-extrabold text-3xl">Create An Account</h1>
     </div>
     <div className="flex justify-center mb-6">
      <button className={`${showTutorForm?'bg-emerald-300':''} rounded-full border border-emerald-300 py-2 px-12 mr-4 font-extrabold`} onClick={handleTutorForm}>Tutor</button>
      <button className={`${showStudentForm?'bg-emerald-300':''} rounded-full border border-emerald-300 py-2 px-12  font-extrabold`} onClick={handleStudentForm}>Student</button>
     </div>
     <div className="flex justify-center">
      {showStudentForm && <StudentForm />}
      {showTutorForm && <TutorForm />}
     </div>
   </div>
  )
}

export default Registration