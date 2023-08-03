import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../services/axios";
import { useNavigate, useParams } from "react-router-dom";
import { studentLogged } from "../../../redux/student/studentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {BsBookmark} from 'react-icons/bs';
import {BsBookmarkFill} from 'react-icons/bs';
interface CategoryData {
  category: string;
  subcategory: [string];
  _id: string;
  status: boolean;
}
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
  bookmarks ?: [string],
}
function CourseList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {selectedCategory} = useParams()
  const studentSlice = useSelector((state: any) => state.student);
  const studId = studentSlice.studId
  const [catData, setCatData] = useState<CategoryData[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [isBookmark,setIsBookmark] = useState(false);
  useEffect(() => {
    // console.log('selcat===',selectedCategory);
    
    fetchCatData();
    fetchCourseData();
  }, [isBookmark,selectedCategory]);

  const fetchCatData = async () => {
    try {
      const response = await api.get("/show-category/");
      console.log("cate data res tut= ", response.data);
      // setData(response.data.cateData)
      setCatData(response.data.newArray);
      console.log("catdataaa=", catData);

      // console.log('cat data',response.data.newArray[0].category);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourseData = async () => {
    try {
      // const response = await api.get(`/show-courses/${studentSlice?.selectedCategory}`);
      const response = await api.get(`/show-courses/${selectedCategory}`);
      console.log("cos res=", response.data);
      setCourses(response.data.courses);
      console.log("new coses=", courses);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCourseBookmark = async (courseId:string) =>{
    try{
      const response = await api.post(`/bookmark/${courseId}/${studId}`);
      console.log(response.data);
      if(response){
        setIsBookmark(true);
      }
    }catch (err) {
      console.error(err);
    }
  }
  const handleRemoveCourseBookmark = async (courseId:string) =>{
    try{
      const response = await api.post(`/remove-bookmark/${courseId}/${studId}`);
      console.log(response.data);
      if(response){
        setIsBookmark(false);
      }
    }catch (err) {
      console.error(err);
    }
  }
  return (
    // <div>courseList:{selectedCategory}</div>
    <div>
      <div className="grid grid-cols-7 gap-4 ">
        <div className="md:col-span-2 col-span-7 bg-gray-100 pt-12">
          {
            catData.map((obj)=>
            <h1 onClick={()=>navigate(`/course-list/${obj.category}`)} className={`ps-36 mb-7 cursor-pointer ${obj.category === selectedCategory ?'bg-custom-blue py-3 text-white':''}`}>{obj.category}</h1>
            )
          }
             {/* <h1 className="text-center">{studentSlice?.selectedCategory}</h1> */}
        </div>

        <div className="md:col-span-5 col-span-7  bg-gray-100 pt-10">
          <h1 className="font-medium text-xl"> Courses</h1>

          {/* {courses.map(course => {
        return(
          <div key={course._id} className="course-card">
          <video controls onContextMenu={(e) => e.preventDefault()}>
            <source type="video/mp4" src={`${process.env.REACT_APP_S3BUCKET_URL}/${course.video}`}/>
          </video>
          <img src={`${process.env.REACT_APP_S3BUCKET_URL}/${course.thumbnail}`} alt={course.title} className='h-32 w-60' />
          <h2>{course.title}</h2>
        </div>
        )
})} */}

          <div className="pe-20" style={{ position: "relative" }}>
            <img
              src="\images\blue-bg.jpg"
              alt=""
              className="h-56 w-full rounded-md"
            />
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: "10px",
                color: "white",
              }}
            >
              <h1 className="text-4xl">Outstanding Online Classes</h1>
              <span>Find what fascinates you as you explore these classes</span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-1 pe-16 mb-5">
            {courses.map((course) => {
              return (
                <div
                  key={course._id}
                  className="bg-white w-72 h-72 rounded-md mb-5 shadow-lg"
                  // onClick={()=>{
                  //   dispatch(studentLogged({ ...studentSlice, selectedCourseId: course._id }));
                  //   navigate(`/course/${course._id}`);
                  // }}

                >
                  <div className="h-40 bg-slate-600 rounded-t-md ">
                    <img
                      src={`${process.env.REACT_APP_S3BUCKET_URL}/${course.thumbnail}`}
                      alt={course.title}
                      className=" rounded-md object-fill"
                      onClick={()=>{
                        dispatch(studentLogged({ ...studentSlice, selectedCourseId: course._id }));
                        navigate(`/course/${course._id}`);
                      }}
                    />
                  </div>
                  <div className="pt-2 ps-1">
                    <h1 className="text-gray-700">{course.title}</h1>
                      <div className="">
                        <p className="text-gray-400 line-clamp-2 text-sm">{course.description}</p>
                      </div>
                  </div>
                  <div className="pt-1 ps-1">
                   {course.students?.includes(studId)?
                    <span className="text-green-800">Purchased <FontAwesomeIcon icon={faCheck} /></span>
                    :
                    <button className="bg-yellow-500 text-black py-2 px-6 text-sm rounded-md hover:bg-yellow-400 transition duration-150 ease-out"
                    onClick={()=>{
                      dispatch(studentLogged({ ...studentSlice, selectedCourseId: course._id }));
                      navigate(`/course/${course._id}`);
                    }}>
                      Purchase
                    </button>
                 }   
                    <span className="text-gray-700 ps-32 font-bold">
                      ${course.fee}
                    </span>
                    {/* <div>
                      <span className="ps-32"><BsBookmark/></span>
                    </div>
                     */}
                  </div>
                  <div className="flex justify-between mr-3 pt-1">
                    <span className="text-sm ml-2 text-gray-600">{course.subcategory}</span>
                      {course.bookmarks?.includes(studId)?
                      <span onClick={()=>handleRemoveCourseBookmark(course._id)}><BsBookmarkFill/></span>
                      :
                      <span onClick={()=>handleCourseBookmark(course._id)}><BsBookmark/></span>
                       }
                    </div>
                  </div>
                
              );
            })}
            </div>
            {/* <div className='h-44 bg-slate-600 rounded-t-md '>
      <img src="\images\knitting.jpg" alt="" className=' rounded-md object-fill'/>
    </div> */}

            {/* </div> */}
            {/* {courses.map(course => {
        return(
          <div key={course._id} className="course-card">
          <video controls onContextMenu={(e) => e.preventDefault()}>
            <source type="video/mp4" src={`${process.env.REACT_APP_S3BUCKET_URL}/${course.video}`}/>
          </video>
          <img src={`${process.env.REACT_APP_S3BUCKET_URL}/${course.thumbnail}`} alt={course.title} className='h-32 w-60' />
          <h2>{course.title}</h2>
        </div>
        )
})} */}
            {/* <div className='bg-green-400 w-72 h-72 rounded-md'>
     <h1>cards</h1>
  </div>
  <div className='bg-green-400 w-72 h-72 rounded-md'>
     <h1>cards</h1>
  </div> */}
            {/* <div className='bg-green-400 w-72 h-72 rounded-md'>
     <h1>cards</h1>
  </div> */}
          {/* </div>+ */}

          {/* <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg h-20" src="\images\graphic.jpg" alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div> */}
        </div>
      </div>
    </div>
  );
}

export default CourseList;
