import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../services/axios";
import { useNavigate, useParams } from "react-router-dom";
import { studentLogged } from "../../../redux/student/studentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { serialize } from "v8";
import "./CourseList.css";
import { Pagination } from "./Pagination";
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
  bookmarks?: [string];
  Details?: [];
}
function CourseList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedCategory } = useParams();
  const studentSlice = useSelector((state: any) => state.student);
  const studId = studentSlice.studId;
  const [catData, setCatData] = useState<CategoryData[]>([]);
  const [courses, setCourses] = useState<Courses[]>([]);
  const [isBookmark, setIsBookmark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSearchList, setFilteredSearchList] = useState<Courses[]>([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(6);
  const lastpostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastpostIndex - postsPerPage;
  
  useEffect(() => {
    fetchCatData();
    fetchCourseData();
  }, [isBookmark, selectedCategory]);


  useEffect(() => {
    console.log("ssee=");

    // const filteredList = courses.filter((item) => {
    const filteredList = currentPosts.filter((item) => {
      const titleMatch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return titleMatch;
    });
    setFilteredSearchList(filteredList);
  }, [searchQuery, courses, currentPage]);

  const fetchCatData = async () => {
    try {
      const response = await api.get("/show-category/");
      console.log("cate data res tut= ", response.data);
      setCatData(response.data.newArray);
      console.log("catdataaa=", catData);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourseData = async () => {
    try {
      const response = await api.get(`/show-courses/${selectedCategory}`);
      console.log("cos res=", response.data);
      setCourses(response.data.courses);
      console.log("new coses=", courses);
    } catch (err) {
      console.error(err);
    }
  };
  //current posts
  const currentPosts = courses.slice(firstPostIndex, lastpostIndex);
  console.log('fpp=',firstPostIndex);
  console.log('fpp=',lastpostIndex);
  console.log('cppp=',currentPosts);
  

  const handleCourseBookmark = async (courseId: string) => {
    try {
      const response = await api.post(`/bookmark/${courseId}/${studId}`);
      console.log(response.data);
      if (response) {
        setIsBookmark(true);
      }
    } catch (err) {
      console.error(err);
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
      <div className="grid grid-cols-7 gap-4 h-screen">
        <div className="md:col-span-2 col-span-7 bg-gray-100 pt-12 h-screen">
          {catData.map((obj) => (
            <h1
              onClick={() => navigate(`/course-list/${obj.category}`)}
              className={`ps-36 mb-7 cursor-pointer ${
                obj.category === selectedCategory
                  ? "bg-custom-blue py-3 text-white"
                  : ""
              }`}
            >
              {obj.category}
            </h1>
          ))}
        </div>
        <div className="md:col-span-5 col-span-7  pt-6 overflow-y-scroll scrolling">
          <div className="pb-1 flex justify-center">
            <input
              type="search"
              className="border border-gray-300 h-10 outline-none rounded-md w-1/2 px-2"
              placeholder={`search...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex justify-center pb-6"></div>
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
          {filteredSearchList.length > 0 ? (
            <div className="mt-5 grid grid-cols-3 gap-1 pe-16 mb-5">
              {filteredSearchList
                .filter((item) => item.Details?.length !== 0)
                .map((course) => {
                  return (
                    <div
                      key={course._id}
                      className="bg-white w-72 h-auto rounded-md mb-5 shadow-lg"
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
                        <div className="">
                          <p className="text-gray-400 line-clamp-2 text-sm">
                            {course.description}
                          </p>
                        </div>
                      </div>
                      <div className="pt-1 ps-1">
                        {course.students?.includes(studId) ? (
                          <span className="text-green-800">
                            Purchased <FontAwesomeIcon icon={faCheck} />
                          </span>
                        ) : (
                          <button
                            className="bg-yellow-500 text-black py-2 px-6 text-sm rounded-md hover:bg-yellow-400 transition duration-150 ease-out"
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
                          >
                            Purchase
                          </button>
                        )}
                        <span className="text-gray-700 ps-32 font-bold">
                          ${course.fee}
                        </span>
                      </div>
                      <div className="flex justify-between mr-3 pt-1">
                        <span className="text-sm ml-2 text-gray-600">
                          {course.subcategory}
                        </span>
                        {course.bookmarks?.includes(studId) ? (
                          <span
                            onClick={() =>
                              handleRemoveCourseBookmark(course._id)
                            }
                          >
                            <BsBookmarkFill />
                          </span>
                        ) : (
                          <span
                            onClick={() => handleCourseBookmark(course._id)}
                          >
                            <BsBookmark />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="flex justify-center">
              <img
                src="/images/no_results_found.png"
                alt="No results found"
                className="h-80"
              />
            </div>
          )}
          <div>
            <Pagination 
            totalPosts={courses.length} 
            postsPerPage={postsPerPage} 
            setCurrentPage={setCurrentPage}
            currentPage={currentPage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseList;
