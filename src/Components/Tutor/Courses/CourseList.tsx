import React, { useEffect, useState } from 'react'
import SideNavbar from '../SideNavbar/SideNavbar'
import { api } from '../../../services/axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tutorLogged } from '../../../redux/tutor/tutorSlice';

interface Courses {
    _id: string;
    title: string;
    fee: number;
    category: string;
    subcategory: string;
    description: string;
    thumbnail: string;
    video: string;
    tutId: string;
    status?: boolean;
    students?: [string];
    videoUrl?: string;
    thumbnailUrl?: string;
  }
function CourseList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tutorSlice = useSelector((state: any) => state.tutor);
    const tutId = tutorSlice.tutId;
    const [courses, setCourses] = useState<Courses[]>([]);
    useEffect(()=>{
       fetchCourseData();
    },[])

    const fetchCourseData = async () =>{
        try{
          const response = await api.get(`/tutor/course-list/${tutId}`);
          console.log('res=',response.data.courseData);
          setCourses(response.data.courseData);
        }catch (err) {
      console.error(err);
    }
    }
  return (

  <div>
    <div className="grid grid-cols-7 gap-4">
     <div className="md:col-span-2 col-span-7 bg-yellow-300"> 
       <SideNavbar/>
     </div>
     <div className="md:col-span-5 col-span-7"> 
      
     <div className="mt-5 grid grid-cols-3 gap-1 pe-16 mb-5 cursor-pointer">
            {courses.map((course) => {
              return (
                <div
                  key={course._id}
                  className="bg-white w-72 h-72 rounded-md mb-5 shadow-lg"
                  onClick={()=>{
                    dispatch(tutorLogged({ ...tutorSlice, courseId: course._id }));
                    navigate(`/tutor/course/${course._id}`);
                  }}

                >
                  <div className="h-40 bg-slate-600 rounded-t-md ">
                    <img
                      src={`${process.env.REACT_APP_S3BUCKET_URL}/${course.thumbnail}`}
                      alt={course.title}
                      className=" rounded-md object-fill"
                    />
                  </div>
                  <div className="pt-2 ps-1">
                  <h1 className="text-gray-700">{course.title}</h1>
                  <p className='line-clamp-2 text-sm text-gray-400'>{course.description}</p>
                  <div className='flex justify-between text-sm mr-3 pt-4'>
                     <span className='text-gray-700 '>{course.subcategory}</span>
                     <span className="text-gray-700 font-bold ">
                      ₹{course.fee}
                    </span>
                  </div>   
                  </div>
                  <div className="pt-10 ps-1">
                    {/* <button className="bg-yellow-500 text-black py-2 px-6 text-sm rounded-md hover:bg-yellow-400 transition duration-150 ease-out">
                      Purchase
                    </button> */}
                  </div>
                </div>
              );
            })}
            </div>
     </div>
    </div>
  </div>
  )
}

export default CourseList