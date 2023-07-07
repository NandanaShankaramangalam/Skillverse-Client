import React, { useState } from 'react'
import SideNavbar from '../SideNavbar/SideNavbar'
import { faPlus, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import VideoUpload from '../VideoUpload/VideoUpload'
import Profile from '../Profile/Profile'

function Dashboard() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const openModal = () => {
        setIsOpen(true);
      };
    
    const closeModal = () => {
        setIsOpen(false);
      };
  return (
    <div>
  <div className="grid grid-cols-7 gap-4">
  <div className="md:col-span-2 col-span-7 bg-yellow-300"> 
  <SideNavbar/>
  </div>
   
  <div className="md:col-span-5 col-span-7"> 
  <div className='justify-end pr-4 flex'>
    <div>
      <button onClick={()=>openModal()}>
        <span className='font-medium text-sm mr-1'>Create</span>
        <FontAwesomeIcon icon={faPlus} className='text-sm'></FontAwesomeIcon>
      </button>
      
    </div>
    <div><button><FontAwesomeIcon icon={faVideo} className='text-2xl ml-1'/></button></div>
   </div>
  <div className='bg-lime-300 w-full h-72'>
    {/* helloooooo */}
    <Profile/>
  </div>
  
  </div>
   </div>
   {isOpen && <VideoUpload setIsOpen={setIsOpen}/>}
    </div>
  )
}

export default Dashboard




