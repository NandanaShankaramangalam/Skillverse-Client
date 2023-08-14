import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { adminLogged } from '../../../redux/admin/adminSlice';
function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const{admUsername} = useSelector((state:any)=>state.admin);
    // const{username} = useSelector((state:RootState)=>state.admin)
    useEffect(() => {
        const admin = localStorage.getItem('admin');
        console.log('admin=',admin);
        console.log('uname adm=',admUsername);
        
        if(admin){
        const token = JSON.parse(admin);
        console.log('iii',token.token);
        if (!token?.token) {
          return navigate('/admin/login');
        }  
        }
        
      },[]);
      
    const handleLogout=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        console.log('ok');
        dispatch(adminLogged({}))
        localStorage.removeItem('admin');
        console.log('logout');
        navigate('/admin/login');
      }
      
  return (
    
    <div>
      <nav className="bg-custom-blue text-white flex items-center justify-between h-20 px-4 md:px-6">
        <div className="ml-3">
          <h1 className="text-xl font-bold"><NavLink to='/'>Skillverse</NavLink></h1>
        </div>
        <div className="md:hidden">
          <button
            className="flex items-center text-white focus:outline-none"
            
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-current"
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-3 text-sm">
          <li>
            <button onClick={()=>navigate('/admin/dashboard')}>
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button onClick={()=>navigate('/admin/tutor-management')}>
              <span>Tutor</span>
            </button>
          </li>
          <li>
            <button onClick={()=>navigate('/admin/student-management')}>
              <span>Student</span>
            </button>
          </li>
          <li>
            <button onClick={()=>navigate('/admin/category-management')}>
              <span>Category</span>
            </button>
          </li>
          <li>
            <button 
            onClick={handleLogout}>
              <span>Logout</span>
            </button>
          </li>
          <li>
            <button >
              <span>{admUsername}</span>
            </button>
          </li>
        </ul>
      </nav>
      

      <div
        className={`w-full  md:hidden bg-custom-blue text-white  justify-center `}
      >
        <div className="w-full">
          <h1 className=" border-black-200 cursor-pointer py-2 text-sm ml-2">
            Dashboard
          </h1>
          <h1 className=" border-black-200 cursor-pointer  py-2 text-sm ml-2">
            Tutor Management
          </h1>
          <h1 className=" border-black-200 cursor-pointer  py-2 text-sm ml-2">
            User Management
          </h1>
          <button onClick={handleLogout}>
           <h1 className=" border-black-200 cursor-pointer  py-2 text-sm ml-2">
            Logout
          </h1> 
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default Navbar