import { Navigate, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();
  const{admUsername} = useSelector((state:any)=>state.admin);
    useEffect(()=>{
      if(!admUsername){
        navigate('/admin/login');
      }
    },[])
  return (
    <div>
        <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard