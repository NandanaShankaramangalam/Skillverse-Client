import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../../services/axios';
import { useSelector } from 'react-redux';

function CourseAttend() {
   
  const navigate = useNavigate();
  const studentSlice = useSelector((state:any)=>state.student);
  // const courseId = studentSlice.courseId;
  const studId = studentSlice.studId;
  const location = useLocation();
  const {video,Vtitle,Vdescription} = location.state
  const {courseId} =useParams()
  const [videoUrl,setVideoUrl] = useState(video);
  const [title,setTitle] = useState(Vtitle);
  const [description,setDescription] = useState(Vdescription);
  const [courseDetails,setCourseDetails] = useState({title:'',fee:'',category:'',thumbnail:'',video:'',tutId:'',description:'',paymentStatus:false,students:[studId],tutorial:[{title:'',video:'',thumbnail:'',description:''}]})
  useEffect(()=>{
    console.log('vdoprop=',video);
    const fetchCourseData = async() =>{
        const courseData = await api.get(`/course/${courseId}`);
        console.log('coses=',courseData.data);
       
        setCourseDetails(courseData.data.result);
        if(courseData.data.result.students.includes(studId)){
       
     }
     else{
        navigate('/');
     }
      }
        fetchCourseData();
  },[courseId])
 
  

  return (
    <div>
       <div className='grid grid-cols-12  h-screen'> 
        <div className='col-span-12 bg-slate-100 md:col-span-8  align-middle pt-6'>
          <div className=' flex justify-center'>
          <video controls onContextMenu={(e) => e.preventDefault()} src={`${process.env.REACT_APP_S3BUCKET_URL}/${videoUrl}`} className='w-full h-96' controlsList="nodownload" autoPlay>
          </video>
        </div>
        <div className='pt-4 ps-10 md:mt-0'>
           <h1 className='text-xl font-semibold'>{title}</h1>
           <p>{description}</p>
        </div>
        </div>
       
        <div className='col-span-12 bg-slate-300 md:col-span-4  pt-6 overflow-y-auto'>
          {
            courseDetails.tutorial.map((item,index)=>{
              return(
                <div  className={`ps-5 flex justify-start items-center py-2 rounded   ${videoUrl===item.video?'shadow border bg-slate-900':''}`} onClick={()=>{setVideoUrl(item.video);
                setTitle(item.title);
                setDescription(item.description)}}>
                  <div className=''>
                   <img src={`${process.env.REACT_APP_S3BUCKET_URL}/${item.thumbnail}`} alt={courseDetails.title} className='h-24 w-36 rounded-md'/>
                  </div>
                  <h1 key={index} className={`ml-4 ${videoUrl===item.video?'text-white':''}`}>{index+1}. {item.title}</h1>
                </div>
                
              )
            })
          } 
      </div>
      </div>
    </div>

  )
}

export default CourseAttend