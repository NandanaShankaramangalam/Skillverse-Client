import React, { useEffect, useState } from 'react'
import { api } from '../../../services/axios'
import { useNavigate } from 'react-router-dom';

interface tutData{
    fname:string,
    lname:string,
    username:string,
    email:string,
    _id:string,
    status:boolean,
    profileLocation:string,
}
function TutorsList() {
    const navigate = useNavigate();
    const [tutors,setTutors] = useState<tutData[]>([]);
    useEffect(()=>{
        handleTutorFetch();
    },[])
    const handleTutorFetch = async() =>{
        const result = await api.get('/tutors-list');
        setTutors(result.data.tutorsData)
        console.log('result===',result.data);
        
    }
  return (
    <div>
        <div className='flex justify-center pt-7'>
            <h1 className='text-3xl font-semibold'>Tutors Directory</h1>
        </div>
        <div className='mx-20 mt-10'>
         <ul>
            {
                tutors.map((obj)=>
                   <div>
                    <li>
                    <div className='flex gap-4'>
                    <div className='w-20 h-20 mb-4 rounded-full overflow-hidden border bg-slate-400 border-black'>  
                      <img src={`${process.env.REACT_APP_S3BUCKET_URL}/${obj.profileLocation}`} alt=""/> 
                    </div>
                    <div className='pt-7 cursor-pointer' onClick={()=>navigate('/view-tutor-profile',{state:{tutId:obj._id,username:obj.username}})}>
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
  )
}

export default TutorsList