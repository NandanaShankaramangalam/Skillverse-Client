import React from 'react'
import { Navigate } from 'react-router-dom';
interface TutorProtectedProps {
    children: React.ReactElement; // or React.ReactElement
  }
const ProtectedTutor:React.FC<TutorProtectedProps>=({children})=> {
    const Tutor=localStorage.getItem("tutor")
    console.log(Tutor,"protected route");
    if(Tutor){
        return children
    }
    return Navigate({to:"/tutor/login"})
    }

export default ProtectedTutor