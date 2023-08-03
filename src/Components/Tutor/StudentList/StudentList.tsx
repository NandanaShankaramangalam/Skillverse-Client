import React, { useEffect, useState } from 'react'
import { api } from '../../../services/axios'
import SideNavbar from '../SideNavbar/SideNavbar';

interface studData{
  fname:string,
  lname:string,
  username:string,
  email:string
  _id:string
  status:boolean
}
function StudentsList() {
    const [data, setData] = useState<studData[]>([]);
    
    useEffect(()=>{
      handleStudentFetch();
    },[])

    const handleStudentFetch = async() =>{
        const result = await api.get('/tutor/show-students');
        console.log('res===',result.data.students);
        setData(result.data.students);
    }
  return (
    <div>
    <div className="grid grid-cols-7 gap-4">
     <div className="md:col-span-2 col-span-7 bg-yellow-300"> 
       <SideNavbar/>
     </div>
     <div className="md:col-span-5 col-span-7"> 
       <div className='mx-20 mt-10'>
         <ul>
            {
                data.map((obj)=>
                   <div>
                    <li>
                    <div className='flex gap-4'>
                    <div className='h-10 mb-4 rounded-full overflow-hidden border bg-slate-400 border-black'>  
                    <img src="/images/nophoto.png" alt="" className='h-10 bg-slate-800 rounded-full'/> 
                    </div>
                    <div className='pt-2 cursor-pointer'>
                        <span className='hover:text-blue-800'>{obj.username}</span>
                    </div>
                    </div>
                    </li>
                   </div>
                )
            }
            
         </ul>
        </div>
      </div>
     </div>
    </div>
 
  )
}

export default StudentsList