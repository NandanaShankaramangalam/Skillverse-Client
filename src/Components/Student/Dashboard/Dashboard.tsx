import React, { useState } from 'react'
import SideNavbar from '../SideNavbar/SideNavbar'
import Profile from '../StudentProfile/Profile'
import Navbar from '../Navbar/Navbar'
import { faBook, faBookmark, faCalendar, faCoins, faMessage, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import PersonalInfo from '../PersonalInfo/PersonalInfo'


function Dashboard() {
  const navigate = useNavigate();
  const{studUsername,StudId} = useSelector((state:any)=>state.student);
  const [isPersonalInfo,setIsPersonalInfo] = useState<boolean>(false);

  const handlePersonalInfo = () =>{
    setIsPersonalInfo(true);
  }
  return (
    <div>
        <Navbar/>
        <div className="grid grid-cols-7 gap-4">
            <div className="md:col-span-2 col-span-7 bg-yellow-300">
              {/* <SideNavbar/> */}
        {/* <div className='text-center mt-10'>
           <div className='w-32 h-32 rounded-full overflow-hidden bg-gray-300 mx-auto'>  
           <img src="./images/photo.jpg" alt="" /> 
           </div>
           <div className='mt-2'>
            <h1 className='text-xl text-slate-950'>{studUsername}</h1>
           </div>
          
           <div className='bg-custom-blue rounded-md w-20 mx-auto'>
             <span className='text-neon-green text-sm font-bold'>Student</span>
           </div>
           <div className='mb-10 mt-8 w-60 mx-auto'>
            <hr className='border border-black'/>
           </div>
        </div>
        <div className='mb-48 pl-48 md:pl-32'>
            <ul className="space-y-4">
            <li><button onClick={()=>handlePersonalInfo()}><FontAwesomeIcon icon={faUser} className='text-lg text-custom-blue'/><span className='ml-4 text-base'>Personal Info</span></button></li>
            <li><FontAwesomeIcon icon={faBook} className='text-lg text-cyan-600'/><span className='ml-4 text-base'>Purchased Courses</span></li>
            <li><button onClick={()=>navigate('/bookmarked-courses')}><FontAwesomeIcon icon={faBookmark} className='text-lg text-red-800'/><span className='ml-3 text-base'>Bookmarked Courses</span></button></li>
            <li><FontAwesomeIcon icon={faCalendar} className='text-lg text-green-600'/><span className='ml-4 text-base'>Slots</span></li>
            <li><FontAwesomeIcon icon={faMessage} className='text-lg text-violet-950'/><span className='ml-4 text-base'>Message</span></li>
            </ul>    
        </div> */}
            <SideNavbar/>
            
            </div>
            <div className="md:col-span-5 col-span-7">
               {isPersonalInfo && <PersonalInfo/>}

            </div>
        </div>
        
    </div>
  )
}

export default Dashboard