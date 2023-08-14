import React from 'react'
import { Navigate } from 'react-router-dom';
interface StudentProtectedProps {
    children: React.ReactElement; // or React.ReactElement
  }
const ProtectedStudent:React.FC<StudentProtectedProps>=({children})=>{
    const Student=localStorage.getItem("student")
    console.log(Student,"protected route");
    if(Student){
        return children
    }
    return Navigate({to:"/login"})

}

export default ProtectedStudent