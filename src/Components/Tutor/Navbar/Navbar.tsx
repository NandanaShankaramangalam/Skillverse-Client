import React , { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { tutorLogged } from '../../../redux/tutor/tutorSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{tutUsername,tutEmail,tutId} = useSelector((state:any)=>state.tutor)
    useEffect(() => {
        const tutor = localStorage.getItem('tutor');
        console.log('tutor=',tutor);
        
        if(tutor){
        const token = JSON.parse(tutor);
        console.log('iii',token.token);
        if (!token?.token) {
          return navigate('/tutor/login');
        }  
        }
        
      },[]);
      
    const handleLogout=(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        console.log('ok');
        dispatch(tutorLogged({}))
        localStorage.removeItem('tutor');
        console.log('logout');
        
        navigate('/tutor/login');
      }
  return (
// <div>Navbar</div>
<div>
<nav className="bg-custom-blue text-white flex items-center justify-between h-20 px-4 md:px-6">
  <div className="ml-3">
    <h1 className="text-xl font-bold"><NavLink to='/tutor/home'>Skillverse</NavLink></h1>
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
    <li className='cursor-pointer'>
      <button onClick={()=>navigate('/tutor/dashboard')}>
        <span>Dashboard</span>
      </button>
    </li>
    {/* <li>
      <button>
        <span>Students</span>
      </button>
    </li> */}
    {/* <li>
      <button >
        <span>Courses</span>
      </button>
    </li> */}
    <li>
      {/* <button 
      onClick={handleLogout}
      >
        <span>Logout {tutUsername}</span>
      </button> */}

      
      <button onClick={tutUsername?handleLogout:()=>navigate('/tutor/login')}>
        <span>{tutUsername?'Logout':'Login'}</span>
      </button>
      {
      tutUsername && <button className='ml-2' onClick={()=>navigate(`/tutor/profile`)}><span>{tutUsername}</span></button>
      }
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