import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../../../services/axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faEllipsisVertical, faLock, faStar, faTimes, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './CourseDetails.css';
import { studentLogged } from '../../../redux/student/studentSlice';
import { Rating } from 'react-simple-star-rating'
import {AiOutlineStar} from 'react-icons/ai'
import { tutorLogged } from '../../../redux/tutor/tutorSlice';
// import Ratings from '../Rating/Rating';
import RatingsAndReviews from '../Rating/Rating';

function CourseDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const studentSlice = useSelector((state:any)=>state.student);
  const courseId = studentSlice.selectedCourseId;
  const studId:string = studentSlice.studId;
  const tutorSlice = useSelector((state:any)=>state.tutor);
  const [courseDetails,setCourseDetails] = useState({_id:'',title:'',fee:'',category:'',thumbnail:'',video:'',tutId:'',description:'',paymentStatus:false,students:[studId],tutorial:[{title:'',video:'',description:''}]})
  const [review,setReview] = useState('');
  const [allReviews,setAllReviews] = useState([{review:'',studId:{username:''},rating:''}]);
  const [err,setErr] = useState({reviewErr:''})
  const [isOpen,setIsOpen] = useState(false);
  const [rate,setRate] = useState(false);
  const [rating, setRating] = useState(0); 
  // const [openRaingModal,setOpenRatingModal] = useState(false);
  // const [studData,setStudData] = useState({courses:[{id:'',paymentStatus:''}]});
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const [videoDuration, setVideoDuration] = useState(0);

  useEffect(()=>{
    fetchData();
    // fetchStudData();
    console.log('cid=',courseId);
    console.log('siddd=',studId);
    handleAllReviewFetch();
    
  },[rate])
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
  const handleReviewChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
     e.preventDefault();
     setReview(e.target.value);
     console.log(review);
     
  }
  const handleReviewSubmit = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    if(review.trim() !== ''){

      const result = await api.post(`/post-review/${courseId}/${studId}`,{review},{ withCredentials: true })
      if(result)
      setReview('');
      console.log('res=',result);
      setErr({reviewErr:''});
      handleAllReviewFetch();
    }
    else{
      setErr({reviewErr:'Please type your review and attempt to post'})
      
    }
  }

  const handleAllReviewFetch = async() =>{
    const result = await api.get(`/view-reviews/${courseId}`);
    console.log('allrev=',result.data.postedReviews);
    
    setAllReviews(result.data.postedReviews)
  }

  // Catch Rating value
  const handleRating = (rate: number) => {
    console.log('rate=',rate);
    
    setRating(rate)
  }

  const handleOpenModal = () =>{
    setIsOpen(true);
    console.log('modal open',isOpen);
  }
  const handleCloseModal = () =>{
    setIsOpen(false);
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
                  <button onClick={()=>{navigate(`/course-attend/${courseDetails._id}`,{state:{video:item.video,Vtitle:item.title,Vdescription:item.description}});
                  //check
                  dispatch(tutorLogged({...tutorSlice,courseId:courseDetails._id}));
                }}><FontAwesomeIcon icon={faCirclePlay} className=' hover:text-white font-thin mr-3 '/></button>
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
                // onClick={()=>navigate('/paypal',{state:{courseDetails:courseDetails,tutId:cou}})}
                onClick={()=>navigate('/paypal',{state:courseDetails})}
                >
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
       {/* review & rating */}
       <div className=' ms-16 me-16 mb-5 text-lg'>
        <div className='mb-4 flex justify-between'>
          <span className=''>Reviews & Ratings</span>
          {courseDetails.students.includes(studId)?
          <span className='text-custom-blue hover:text-blue-950 cursor-pointer' onClick={handleOpenModal}>Rate the course</span>
          :
          <span></span>
          }
        </div>
       
       {
        allReviews.length !==0 ?
       <div className='h-96 pt-2 bg-slate-100 overflow-y-scroll'>
       {
         allReviews.map((obj,idx)=>
         <div key={idx} className='flex w-full relative'>
         <div className='mt-3 ms-2 w-full '>
          <div className='flex '>
           <img src="/images/nophoto.png" alt="" className='h-10 bg-slate-800 rounded-full'/>   
           <h1 className='ml-3 text-md font-semibold'>{obj.studId.username}</h1>
           {parseInt(obj.rating)>0?
           <span className='ml-4 px-1 pt-1 text-base rounded-md h-7 text-white bg-custom-blue'><span>{obj.rating}.0 </span><FontAwesomeIcon icon={faStar} className=' text-yellow-400 text-base'/></span> 
           :
          <span></span> 
          }
           </div>
           <span className='ml-12 text-sm'>{obj.review}</span>
           <div className="flex w-fit h-fit   absolute top-2 right-5">
            <span><FontAwesomeIcon icon={faEllipsisVertical} className='text-gray-700'/></span>
           </div>
           {/* <button
      className='ml-auto text-gray-500 hover:text-red-500'
   
    >
      <FontAwesomeIcon icon={faTrash} className='text-base'/>
    </button> */}
          </div>
          
          </div>
         )

       }
       </div>
       :
       <div className='text-sm text-slate-800'>No reviews yet. Be the first one to post a review.</div>
       }
       {/* <div className='mt-2 ms-2'>
        <img src="/images/nophoto.png" alt="" className='h-10 bg-slate-800 rounded-full'/> */}
        {courseDetails.students.includes(studId) ?
          <div>
          <form action="">
          <div className='mt-3'>
               <textarea
                 name="review"
                 id="formInputControl5"
                 className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                 cols={10}
                 rows={4}
                 style={{ resize: "none" }}
                 placeholder='Write your review here...'
                 value={review}
               //   onChange={addData}
               // value={description} 
               onChange={(e)=>handleReviewChange(e)}
               >{review}</textarea>
               <p className="text-red-600 text-sm mb-2">{err.reviewErr}</p>
             </div>
             <div className='flex justify-end'>
             <button
                 className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md hover:bg-gray-700 transition duration-150 ease-out"
                 onClick={(e)=>handleReviewSubmit(e)}
               >
                 Post
               </button>
             </div>
          </form>
          </div>
          :
          <div></div>
        }
        
      </div>
      {/* //rating modal */}
      {
        isOpen &&  
        <RatingsAndReviews setIsOpen={setIsOpen} isOpen={isOpen} courseId={courseId} setRate={setRate} rate={rate}/>
      //   <div className="fixed inset-0 flex items-center justify-center z-50">
      //   <div className="bg-white p-6 rounded-lg shadow-lg">
      //     <div className='flex justify-end'>
      //       <button onClick={handleCloseModal}>
      //         <FontAwesomeIcon icon={faTimes} />
      //       </button> 
      //       <RatingsAndReviews/>
      //     </div>
      //   </div>
      // </div>
}
    </div>
  )
}

export default CourseDetails