import { faBook, faCalendar, faCoins, faMessage, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function SideNavbar() {
  const{tutUsername,tutEmail,tutId} = useSelector((state:any)=>state.tutor);
  const navigate = useNavigate();
  return (
    <div>
        <div className='text-center mt-10'>
           <div className='mt-2'>
            <h1 className='text-xl text-slate-950'>{tutUsername}</h1>
           </div>
           <div className='mt-1 mb-2'>
            <h1 className='text-sm text-gray-800'>Artist and Designer</h1>
           </div>
           <div className='bg-custom-blue rounded-md w-20 mx-auto'>
             <span className='text-neon-green text-sm font-bold'>Teacher</span>
           </div>
           <div className='mb-8 mt-5 w-60 mx-auto'>
           </div>
        </div>
        <div className=' mb-72 pl-48 md:pl-32'>
            <ul className="space-y-4">
            <li className='cursor-pointer' onClick={()=>navigate('/tutor/courses')}><FontAwesomeIcon icon={faBook} className='text-lg text-cyan-600'/><span className='ml-4 text-base'>Courses</span></li>
            <li className='cursor-pointer' onClick={()=>navigate('/tutor/chat')}><FontAwesomeIcon icon={faMessage} className='text-lg text-violet-950'/><span className='ml-4 text-base'>Message</span></li>
             </ul>  
        </div>
    </div>
  )
}

export default SideNavbar