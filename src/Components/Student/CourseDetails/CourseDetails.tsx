import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../../services/axios';

function CourseDetails() {
  const studentSlice = useSelector((state:any)=>state.student);
  const courseId = studentSlice.selectedCourseId;
  const [courseDetails,setCourseDetails] = useState({title:'',fee:'',category:'',thumbnail:'',video:'',tutId:'',description:''})

  useEffect(()=>{
    fetchData();
    console.log('cid=',courseId);
    
  },[])
  const fetchData = async() =>{
    const courseData = await api.get(`/course/${courseId}`)
    console.log('cos det =',courseData.data);
    setCourseDetails(courseData.data.result)
  }
  return (
    <div className='mt-1'>
      <div className='bg-custom-blue h-72 grid grid-cols-8'>
        <div className='col-span-3  ps-20'>
          <h1>hgbghbhgvbghbv {courseId}</h1>


          <div className="course-card">
          <video controls onContextMenu={(e) => e.preventDefault()} src={`${process.env.REACT_APP_S3BUCKET_URL}/${courseDetails?.video}`} className='w-96 h-60'>
              {/* <source src={`${process.env.REACT_APP_S3BUCKET_URL}/${courseDetails?.video}`}></source> */}
              {/* <source src={`${process.env.REACT_APP_S3BUCKET_URL}/${courseDetails?.video}`}></source> */}
          </video>
          {/* <img src={`${process.env.REACT_APP_S3BUCKET_URL}/${courseDetails.thumbnail}`} alt={courseDetails.title} className='h-32 w-60' /> */}
          {/* <h2>{courseDetails.title}</h2> */}
          </div>


        </div>
        <div className='col-span-5 '>
          <div className='mt-20 text-white'>
            <h1 className='text-5xl ms-10'>{courseDetails.title}</h1>
          </div>
        </div>
      </div>

      <div className='bg-green-300 h-96 grid grid-cols-8 mb-10'>
        <div className='col-span-6 h-96 bg-slate-500 ps-16 pt-10'>
          <div>
            <h1 className='text-2xl'>About the class</h1>
          </div>
          <div>
            <p>{courseDetails.description}</p>
          </div>
        </div>
        <div className='col-span-2 h-96 bg-orange-900'>
          <h1>ygggugug</h1>
        </div>
      <div>

        </div>
      </div> 
    </div>
  )
}

export default CourseDetails