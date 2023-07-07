import { faBook, faCalendar, faCoins, faMessage, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function SideNavbar() {
  return (
    <div>
        <div className='text-center mt-5'>
           <div className='w-32 h-32 rounded-full overflow-hidden bg-gray-300 mx-auto'>  
           <img src="./images/photo.jpg" alt="" /> 
           </div>
           <div className='mt-2'>
            <h1 className='text-xl text-slate-950'>Nandana</h1>
           </div>
           <div className='mt-1 mb-2'>
            <h1 className='text-sm text-gray-800'>Artist and Designer</h1>
           </div>
           <div className='bg-custom-blue rounded-md w-20 mx-auto'>
             <span className='text-neon-green text-sm font-bold'>Teacher</span>
           </div>
           <div className='mb-8 mt-5 w-60 mx-auto'>
            <hr className='border border-black'/>
           </div>
        </div>
        <div className=' mb-20 pl-48 md:pl-32'>
            {/* <div className=' bg-amber-300 '> */}
            <ul className="space-y-4">
            <li><FontAwesomeIcon icon={faUser} className='text-lg text-custom-blue'/><span className='ml-4 text-base'>Personal Info</span></li>
            <li><FontAwesomeIcon icon={faBook} className='text-lg text-cyan-600'/><span className='ml-4 text-base'>Courses</span></li>
            <li><FontAwesomeIcon icon={faUsers} className='text-lg text-yellow-400'/><span className='ml-3 text-base'>Students</span></li>
            <li><FontAwesomeIcon icon={faCalendar} className='text-lg text-green-600'/><span className='ml-4 text-base'>Slots</span></li>
            <li><FontAwesomeIcon icon={faMessage} className='text-lg text-violet-950'/><span className='ml-4 text-base'>Message</span></li>
            <li><FontAwesomeIcon icon={faCoins} className='text-lg text-red-800'/><span className='ml-4 text-base'>Revenue</span></li>
            </ul>  
            {/* </div> */}
           
        </div>
    </div>
  )
}

export default SideNavbar