import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { api } from '../../../services/axios';
import CourseCreation from '../CourseCreation/CourseCreation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {
  const navigate = useNavigate();
    const [courseDetails,setCourseDetails] = useState({_id:'',title:'',fee:'',category:'',thumbnail:'',video:'',tutId:'',description:'',tutorial:[{title:'',video:'',description:''}]})
    const tutorSlice = useSelector((state:any)=>state.tutor);
    const courseId = tutorSlice.courseId;
    const [isOpen,setIsOpen] = useState(false);
    useEffect(()=>{
        fetchData();
        console.log('cid=',courseId);
      },[])
      const fetchData = async() =>{
        const courseData = await api.get(`/tutor/course-details/${courseId}`)
        console.log('cos detss =',courseData.data.courseData);
        setCourseDetails(courseData.data.courseData)
      }
  return (
    <div className='mt-1'>
    <div className='bg-custom-blue h-72 grid grid-cols-8'>
      <div className='col-span-8 md:col-span-3  ps-16'>
        <div className="course-card pt-3">
        <video controls onContextMenu={(e) => e.preventDefault()} src={`${process.env.REACT_APP_S3BUCKET_URL}/${courseDetails?.video}`} className='w-96 h-60' controlsList="nodownload" autoPlay>
        </video>
        </div>
      </div>
      <div className='col-span-8 md:col-span-5 '>
        <div className='mt-20 text-white'>
          <h1 className='text-5xl ms-4'>{courseDetails.title}</h1>
        </div>
      </div>
    </div>

    <div className='  grid grid-cols-11 mb-10'>
      <div className='col-span-11 md:col-span-7  ps-16 pt-10'>
        <div>
          <h1 className='text-2xl'>About the class</h1>
        </div>
        <div className='pe-36 pt-3 pb-7'>
          <p>{courseDetails.description}</p>
        </div>
        {/* <div className='pb-5 '>
          <img src={`${process.env.REACT_APP_S3BUCKET_URL}/${courseDetails.thumbnail}`} alt={courseDetails.title} className='h-60'/>
        </div> */}
        
        <div className='bg-slate-100 w-2/3'>
         <h1 className='text-xl cursor-pointer mb-2'>Lessons in this class</h1>
         {
           courseDetails.tutorial.map((item,index)=>{
            return(
             <> 
             <div onClick={()=>navigate(`/course-tutorials/${courseDetails._id}`,{state:{video:item.video,Vtitle:item.title,Vdescription:item.description}})} className={`hover:bg-custom-blue text-black hover:text-white  rounded-sm ps-2 py-3`}>
              <h1 className='cursor-pointer '><FontAwesomeIcon icon={faCirclePlay} className=' hover:text-white font-thin mr-3 '/> 
              <span key={index}>{index+1}.</span> {item.title}</h1>
             </div>
             </>
             
            )
           })
         }   
      </div>

      </div>

      <div className='col-span-11 md:col-span-4 '>
        <div>
          <div className='bg-gray-100 mx-5 mt-14 me-28 rounded-md pt-5 shadow-lg'>
              <div className='ps-6 mb-3'>
                <h1 className='text-2xl font-extrabold'>Add classes</h1>
              </div>
            <div className='ps-6 mb-3'>
              
              <h1>Total : <span className='font-bold'>₹{courseDetails.fee}</span></h1>
            </div>
            <div className='ps-9 mb-3'>
              <button className="bg-custom-blue text-white py-2 md:px-6 text-sm rounded-md w-72 mb-8 hover:bg-gray-700 transition duration-150 ease-out"
              onClick={()=>setIsOpen(true)}>
                 Add Course
              </button>
            </div> 
            {/* <div className='flex justify-center'>
              <img src="\images\payment.png" alt="" className='h-28 mb-8'/>      
            </div> */}
            
          </div>
        </div>
      </div>
    </div> 

    <div>
       {isOpen && <CourseCreation setIsOpen={setIsOpen}/>}
    </div>
  </div>
  )
}

export default CourseDetails