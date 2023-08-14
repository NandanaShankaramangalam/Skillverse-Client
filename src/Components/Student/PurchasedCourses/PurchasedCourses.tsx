import React, { useState,useEffect } from 'react'
import SideNavbar from '../SideNavbar/SideNavbar';
import Navbar from '../Navbar/Navbar';
import { api } from '../../../services/axios';
import { useDispatch, useSelector } from 'react-redux';
import { studentLogged } from '../../../redux/student/studentSlice';
import { useNavigate } from 'react-router-dom';

interface Courses {
    _id: string;
    title: string;
    fee: number;
    category: string;
    subcategory: string[];
    description: string;
    thumbnail: string;
    video: string;
    tutId: string;
    status?: boolean;
    students?: [string];
    videoUrl?: string;
    thumbnailUrl?: string;
    bookmarks ?: [string],
  }
function PurchasedCourses() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [courses,setCourses] = useState<Courses[]>([]);
    const studentSlice = useSelector((state:any)=>state.student);
    const studId = studentSlice.studId;
    
    useEffect(()=>{
      handlePurchasedCourses();
    },[])
    const handlePurchasedCourses = async() =>{
        try{
         const result = await api.get(`/purchased-courses/${studId}`)
         console.log('ress=',result.data);
         setCourses(result.data.purchasedCourses)
        }catch(err){
          console.log(err);
          
        }
      }
  return (
    <div>
        <Navbar/>
        <div className="grid grid-cols-7 gap-4">
            <div className="md:col-span-2 col-span-7 bg-gray-100">
              <SideNavbar/>
            </div>
            <div className="md:col-span-5 col-span-7">
              {
                courses.length>0 ?
            <div className="mt-5 grid grid-cols-3 gap-1 pe-16 mb-5">
            {courses.map((course) => {
              return (
                <div
                  key={course._id}
                  className="bg-white w-72 h-72 rounded-md mb-5 shadow-lg"

                >
                  <div className="h-40 bg-slate-600 rounded-t-md ">
                    <img
                      src={`${process.env.REACT_APP_S3BUCKET_URL}/${course.thumbnail}`}
                      alt={course.title}
                      className=" rounded-md object-fill"
                      onClick={()=>{
                        dispatch(studentLogged({ ...studentSlice, selectedCourseId: course._id }));
                        navigate(`/course/${course._id}`,{state:course.tutId});
                      }}
                    />
                  </div>
                  <div className="pt-2 ps-1">
                    <h1 className="text-gray-700">{course.title}</h1>
                  </div>
                  <div className="pt-2 ps-1">
                  <p className="text-gray-400 line-clamp-2 text-sm">{course.description}</p>
                  </div>
                  
                  <div className="flex justify-between pt-3 mr-3">
                      <div>
                        <span className="text-gray-500 ps-2 font-bold">
                           ${course.fee}
                        </span>
                      </div>
                     
                  </div>
                  
                  </div>
                
              );
            })}
            </div>
            :
            <div>gjgggv</div>
            }

            </div>
        </div>
        
    </div>
  )
}

export default PurchasedCourses