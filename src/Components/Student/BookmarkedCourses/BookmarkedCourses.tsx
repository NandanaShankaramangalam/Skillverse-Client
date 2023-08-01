import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideNavbar from '../SideNavbar/SideNavbar'

function BookmarkedCourses() {
  return (
    <div>
        <Navbar/>
        <div className="grid grid-cols-7 gap-4">
            <div className="md:col-span-2 col-span-7 bg-yellow-300">
              <SideNavbar/>
            </div>
            <div className="md:col-span-5 col-span-7">
            {/* <div className="mt-5 grid grid-cols-3 gap-1 pe-16 mb-5">
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
                        navigate(`/course/${course._id}`);
                      }}
                    />
                  </div>
                  <div className="pt-2 ps-1">
                    <h1 className="text-gray-700">{course.title}</h1>
                  </div>
                  <div className="pt-8 ps-1">
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
                  </div>
                  <div className="flex justify-end mr-3 pt-2">
                      {course.bookmarks?.includes(studId)?
                      <span onClick={()=>handleRemoveCourseBookmark(course._id)}><BsBookmarkFill/></span>
                      :
                      <span onClick={()=>handleCourseBookmark(course._id)}><BsBookmark/></span>
                       }
                    </div>
                  </div>
                
              );
            })}
            </div> */}

            </div>
        </div>
        
    </div>
  )
}

export default BookmarkedCourses