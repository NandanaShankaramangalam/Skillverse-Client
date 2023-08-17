import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SideNavbar from "../SideNavbar/SideNavbar";
import { api } from "../../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { studentLogged } from "../../../redux/student/studentSlice";
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
  bookmarks?: [string];
}
function BookmarkedCourses() {
  const studentSlice = useSelector((state: any) => state.student);
  const studId = studentSlice.studId;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Courses[]>([]);
  const [isBookmark, setIsBookmark] = useState(true);
  useEffect(() => {
    handleFetchSavedCourses();
  }, [isBookmark]);
  const handleFetchSavedCourses = async () => {
    try {
      const result = await api.get(`/saved-courses/${studId}`);
      console.log("ressbbggbgb=", result.data);
      setCourses(result.data.bookmarkedCourses);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveCourseBookmark = async (courseId: string) => {
    try {
      const response = await api.post(`/remove-bookmark/${courseId}/${studId}`);
      console.log(response.data);
      if (response) {
        setIsBookmark(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-7 gap-4">
        <div className="md:col-span-2 col-span-7 bg-gray-100">
          <SideNavbar />
        </div>
        <div className="md:col-span-5 col-span-7">
          {courses.length > 0 ? (
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
                        onClick={() => {
                          dispatch(
                            studentLogged({
                              ...studentSlice,
                              selectedCourseId: course._id,
                            })
                          );
                          navigate(`/course/${course._id}`, {
                            state: course.tutId,
                          });
                        }}
                      />
                    </div>
                    <div className="pt-2 ps-1">
                      <h1 className="text-gray-700">{course.title}</h1>
                    </div>
                    <div className="pt-2 ps-1">
                      <p className="text-gray-400 line-clamp-2 text-sm">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex justify-between pt-3 mr-3">
                      <div>
                        <span className="text-gray-500 ps-2 font-bold">
                          ${course.fee}
                        </span>
                      </div>
                      <div className="">
                        {course.bookmarks?.includes(studId) && (
                          <span
                            onClick={() =>
                              handleRemoveCourseBookmark(course._id)
                            }
                          >
                            <BsBookmarkFill />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div className="flex justify-center relative pt-20">
                <img src="/images/bookmark.jpg" alt="" className="h-96" />
                <div className="absolute top-72 left-0 right-0 bottom-0 flex items-center justify-center">
                  <p className="text-gray-400">No bookmarked courses yet!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookmarkedCourses;
