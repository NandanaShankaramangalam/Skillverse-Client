import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../../services/axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faLock } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './CourseDetails.css';
import { studentLogged } from '../../../redux/student/studentSlice';
function CourseDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentSlice = useSelector((state:any)=>state.student);
  const courseId = studentSlice.selectedCourseId;
  const studId:string = studentSlice.studId;
  const [courseDetails,setCourseDetails] = useState({title:'',fee:'',category:'',thumbnail:'',video:'',tutId:'',description:'',paymentStatus:false,students:[studId],tutorial:[{title:'',video:''}]})
  // const [studData,setStudData] = useState({courses:[{id:'',paymentStatus:''}]});
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const [videoDuration, setVideoDuration] = useState(0);

  useEffect(()=>{
    fetchData();
    // fetchStudData();
    console.log('cid=',courseId);
    console.log('siddd=',studId);
    
    
  },[])
  const fetchData = async() =>{
    const courseData = await api.get(`/course/${courseId}`)
    console.log('cos det =',courseData.data);
    setCourseDetails(courseData.data.result);
    if(courseDetails.students.includes(studId)){
      const paymentStatus = true;
      dispatch(studentLogged({...studentSlice,paymentStatus:paymentStatus}))
    }
  }
  const handleAlert = () =>{
    Swal.fire('Purchase to access the course!');
  }

  // const fetchStudData = async() =>{
  //   console.log('okkk');
  //   const response = await api.get(`/student/${studId}`);
  //   console.log('stud det=',response.data);
  //   setStudData(response.data)
  // }

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.addEventListener('loadedmetadata', handleVideoLoaded);
  //   }

  //   return () => {
  //     if (videoRef.current) {
  //       videoRef.current.removeEventListener('loadedmetadata', handleVideoLoaded);
  //     }
  //   };
  // }, [videoRef]);

  // const handleVideoLoaded = () => {
  //   const videoElement = videoRef.current as HTMLVideoElement;
  //   const duration = videoElement?.duration;
  //   setVideoDuration(duration || 0);
  // };

  //   const formatDuration = (duration: number) => {
  //   const minutes = Math.floor(duration / 60);
  //   const seconds = Math.floor(duration % 60);
  //   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  // };
  return (
    <div className='mt-1'>
      <div className='bg-custom-blue h-72 grid grid-cols-8'>
        <div className='col-span-8 md:col-span-3  ps-16'>
          <div className="course-card pt-3">
          <video controls onContextMenu={(e) => e.preventDefault()} src={`${process.env.REACT_APP_S3BUCKET_URL}/${courseDetails?.video}`}
           className='w-96 h-60'  controlsList="nodownload" autoPlay 
          //  ref={videoRef}
           >
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
          <div className='pb-5 '>
            <img src={`${process.env.REACT_APP_S3BUCKET_URL}/${courseDetails.thumbnail}`} alt={courseDetails.title} className='h-60'/>
          </div>
          <div className='bg-red-300'>
         <h1 className='text-xl text-black mb-2'>Lessons in this class</h1>
         {
           courseDetails.tutorial.map((item,index)=>{
            return(
             <> 
              {/* <h1 className='cursor-pointer'><span key={index}>{index+1}.</span> {item.title} (Duration: {formatDuration(videoDuration)})</h1> */}
              <div className={`hover:bg-custom-blue  rounded-sm ps-2 py-3`}>
                <h1 className='cursor-pointer text-white'>
                  {courseDetails.students.includes(studId) ?
                  <button onClick={()=>navigate(`/course-attend/${courseId}`,{state:item.video})}><FontAwesomeIcon icon={faCirclePlay} className=' hover:text-white font-thin mr-3 '/></button>
                  :
                  <button onClick={handleAlert}><FontAwesomeIcon icon={faLock} className='text-white font-thin mr-3 '/></button>
                  }
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
            {!courseDetails.students.includes(studId) &&
            <div className='bg-gray-100 mx-5 mt-14 me-28 rounded-md pt-5 shadow-lg'>
            <div className='ps-6 mb-3'>
                  <h1 className='text-2xl font-extrabold'>Checkout</h1>
                </div>
              <div className='ps-6 mb-3'>
                
                <h1>  Total : <span className='font-bold'>₹{courseDetails.fee}</span></h1>
              </div>
              <div className='ps-9 mb-3'>
                <button className="bg-custom-blue text-white py-2 md:px-6 text-sm rounded-md w-72 hover:bg-gray-700 transition duration-150 ease-out"
                onClick={()=>navigate('/paypal',{state:courseDetails})}>
                   Buy now
                </button>
              </div> 
              <div className='flex justify-center'>
                <img src="\images\payment.png" alt="" className='h-28 mb-8'/>      
              </div>  
            </div>
            }
          </div>
        </div>

      </div> 
    </div>
  )
}

export default CourseDetails