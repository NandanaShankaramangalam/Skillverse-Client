import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../services/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlay,
  faEllipsisVertical,
  faL,
  faLock,
  faStar,
  faTimes,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import "./CourseDetails.css";
import { studentLogged } from "../../../redux/student/studentSlice";
import { Rating } from "react-simple-star-rating";
import { AiOutlineStar } from "react-icons/ai";
import { tutorLogged } from "../../../redux/tutor/tutorSlice";
// import Ratings from '../Rating/Rating';
import RatingsAndReviews from "../Rating/Rating";
const ObjectId = require("bson-objectid");

function CourseDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const tutId = location.state;
  console.log("ttttuutt=", tutId);
  const studentSlice = useSelector((state: any) => state.student);
  const courseId = studentSlice.selectedCourseId;
  const studId: string = studentSlice.studId;
  const tutorSlice = useSelector((state: any) => state.tutor);
  const [courseDetails, setCourseDetails] = useState({
    _id: "",
    title: "",
    fee: "",
    category: "",
    thumbnail: "",
    video: "",
    tutId: "",
    description: "",
    paymentStatus: false,
    students: [studId],
    tutorial: [{ title: "", video: "", description: "" }],
    stud: [{ id: "", date: "" }],
  });
  const [review, setReview] = useState("");
  const [allReviews, setAllReviews] = useState([
    { _id: "", review: "", studId: { username: "", _id: "" }, rating: "" },
  ]);
  const [err, setErr] = useState({ reviewErr: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [rate, setRate] = useState(false);
  const [rating, setRating] = useState(0);
  const [istoolTip, setIsToolTip] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newReview, setNewReview] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [state, setState] = useState(false);
  const [revId, setRevId] = useState("");
  const [tutorData, setTutorData] = useState({
    username: "",
    profileLocation: "",
    niche: "",
  });
  // const [openRatingModal,setOpenRatingModal] = useState(false);
  // const [studData,setStudData] = useState({courses:[{id:'',paymentStatus:''}]});
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const [videoDuration, setVideoDuration] = useState(0);

  useEffect(() => {
    fetchData();
    // fetchStudData();
    console.log("cid=", courseId);
    console.log("siddd=", studId);
    handleAllReviewFetch();
    fetchTutorData();
  }, [rate, state]);
  const fetchData = async () => {
    const courseData = await api.get(`/course/${courseId}`);
    console.log("cos det =", courseData.data);
    setCourseDetails(courseData.data.result);
    if (courseDetails.students.includes(studId)) {
      const paymentStatus = true;
      dispatch(
        studentLogged({ ...studentSlice, paymentStatus: paymentStatus })
      );
    }
  };
  const fetchTutorData = async () => {
    const res = await api.get(`/view-tutor-profile/${tutId}`);
    if (res.data) {
      console.log("res.data=", res.data);
      setTutorData(res.data.tutorData);
    }
  };
  const handleAlert = () => {
    Swal.fire("Purchase to access the course!");
  };
  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setReview(e.target.value);
    console.log(review);
  };
  const handleReviewSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (review.trim() !== "") {
      const result = await api.post(
        `/post-review/${courseId}/${studId}`,
        { review },
        { withCredentials: true }
      );
      if (result) setReview("");
      console.log("res=", result);
      setErr({ reviewErr: "" });
      handleAllReviewFetch();
    } else {
      setErr({ reviewErr: "Please type your review and attempt to post" });
    }
  };

  const handleAllReviewFetch = async () => {
    const result = await api.get(`/view-reviews/${courseId}`);
    console.log("allrev=", result.data.postedReviews);
    setAllReviews(result.data.postedReviews);
    console.log("ghvghvghvghvghv=", ObjectId(studId));
  };

  // Catch Rating value
  const handleRating = (rate: number) => {
    console.log("rate=", rate);

    setRating(rate);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
    console.log("modal open", isOpen);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const showTooltip = () => {
    setIsToolTip(true);
  };
  const hideTooltip = () => {
    setIsToolTip(false);
  };

  const editReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview(e.target.value);
  };

  const handleReviewUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const res = await api.post(
      "/edit-reviews",
      { reviewId, newReview },
      { withCredentials: true }
    );
    if (res.data) {
      console.log("res.data=", res.data);
      setEdit(false);
      setState(!state);
    }
  };

  const handleReviewDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const res = await api.post("/delete-reviews", { reviewId });
    console.log("resss=", res.data);
    setState(!state);
  };

  return (
    <div className="mt-1">
      <div className={`bg-custom-blue h-72 grid grid-cols-8`}>
        <div className="col-span-8 md:col-span-3  ps-16">
          <div className="course-card pt-3">
            <video
              controls
              onContextMenu={(e) => e.preventDefault()}
              src={`${process.env.REACT_APP_S3BUCKET_URL}/${courseDetails?.video}`}
              className="w-96 h-60"
              controlsList="nodownload"
              autoPlay
            ></video>
          </div>
        </div>
        <div className="col-span-8 md:col-span-5 ">
          <div className="mt-20 text-white">
            <h1 className="text-5xl ms-4">{courseDetails.title}</h1>
          </div>
          <div className="flex ps-4">
            <div className="w-12 h-12 mt-6 rounded-full overflow-hidden border border-black">
              <img
                src={`${process.env.REACT_APP_S3BUCKET_URL}/${tutorData.profileLocation}`}
                alt="tutor-image"
              />
            </div>
            <div className="ps-4 mt-10">
              <h1
                onClick={() =>
                  navigate("/view-tutor-profile", {
                    state: { tutId: tutId, username: tutorData.username },
                  })
                }
                className="text-white cursor-pointer hover:text-blue-900"
              >
                {tutorData.username}, {tutorData.niche}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="  grid grid-cols-11 mb-10">
        <div className="col-span-11 md:col-span-7  ps-16 pt-10">
          <div>
            <h1 className="text-2xl">About the class</h1>
          </div>
          <div className="pe-36 pt-3 pb-7">
            <p>{courseDetails.description}</p>
          </div>

          <div className="bg-slate-100 w-3/4">
            <h1 className="text-xl text-black mb-2 p-2">
              Lessons in this class
            </h1>
            {courseDetails.tutorial.map((item, index) => {
              return (
                <>
                  <div
                    className={`hover:bg-custom-blue  text-black hover:text-white  rounded-sm ps-2 py-3`}
                  >
                    <h1 className="cursor-pointer">
                      {courseDetails.students.includes(studId) ? (
                        <button
                          onClick={() => {
                            navigate(`/course-attend/${courseDetails._id}`, {
                              state: {
                                video: item.video,
                                Vtitle: item.title,
                                Vdescription: item.description,
                              },
                            });
                            dispatch(
                              tutorLogged({
                                ...tutorSlice,
                                courseId: courseDetails._id,
                              })
                            );
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCirclePlay}
                            className="font-thin mr-3 "
                          />
                        </button>
                      ) : (
                        <button onClick={handleAlert}>
                          <FontAwesomeIcon
                            icon={faLock}
                            className="font-thin mr-3 "
                          />
                        </button>
                      )}
                      <span key={index}>{index + 1}.</span> {item.title}
                    </h1>
                  </div>
                </>
              );
            })}
          </div>
        </div>

        <div className="col-span-11 md:col-span-4 ">
          <div>
            {!courseDetails.students.includes(studId) ? (
              <div className="bg-gray-100 mx-5 mt-14 me-28 rounded-md pt-5 shadow-lg">
                <div className="ps-6 mb-3">
                  <h1 className="text-2xl font-extrabold">Checkout</h1>
                </div>
                <div className="ps-6 mb-3">
                  <h1>
                    {" "}
                    Total :{" "}
                    <span className="font-bold">${courseDetails.fee}</span>
                  </h1>
                </div>
                <div className="ps-9 mb-3">
                  <button
                    className="bg-custom-blue text-white py-2 md:px-6 text-sm rounded-md w-72 hover:bg-gray-700 transition duration-150 ease-out"
                    onClick={() =>
                      navigate("/paypal", { state: courseDetails })
                    }
                  >
                    Buy now
                  </button>
                </div>
                <div className="flex justify-center">
                  <img src="\images\payment.png" alt="" className="h-28 mb-8" />
                </div>
              </div>
            ) : (
              <div className=" h-96 w-96 mx-5 mt-14 me-28 rounded-md p-5 pt-0 shadow-lg relative">
                <div className="absolute top-80 left-0 right-0 text-center">
                  <span>
                    Purchased on :{" "}
                    {courseDetails.stud.map((obj) => {
                      return obj.id == studId ? obj.date.split("T")[0] : "";
                    })}
                  </span>
                </div>
                <div>
                  <img
                    src="/images/online-training-woman.jpg"
                    alt=""
                    className=""
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* review & rating */}
      <div className=" ms-16 me-16 mb-5 text-lg">
        <div className="mb-4 flex justify-between">
          <span className="">Reviews & Ratings</span>
          {courseDetails.students.includes(studId) ? (
            <span
              className="text-custom-blue hover:text-blue-950 cursor-pointer"
              onClick={handleOpenModal}
            >
              Rate the course
            </span>
          ) : (
            <span></span>
          )}
        </div>

        {allReviews.length !== 0 ? (
          <div className="h-96 pt-2 bg-slate-100 overflow-y-scroll">
            {allReviews.map((obj, idx) => (
              <div
                key={idx}
                className="flex w-full relative"
                onMouseOver={() => showTooltip()}
                onMouseOut={() => hideTooltip()}
              >
                <div className="mt-3 ms-2 w-full ">
                  <div className="flex ">
                    <img
                      src="/images/nophoto.png"
                      alt=""
                      className="h-10 bg-slate-800 rounded-full"
                    />
                    <h1 className="ml-3 text-md font-semibold">
                      {obj.studId.username}
                    </h1>
                    {parseInt(obj.rating) > 0 ? (
                      <span className="ml-4 px-1 pt-1 text-base rounded-md h-7 text-white bg-custom-blue">
                        <span>{obj.rating}.0 </span>
                        <FontAwesomeIcon
                          icon={faStar}
                          className=" text-yellow-400 text-base"
                        />
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </div>
                  <span className="ml-12 text-sm">{obj.review}</span>
                  {istoolTip && obj.studId._id === studId && (
                    <div className="flex w-fit h-fit   absolute top-2 right-5">
                      <span>
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                          className="text-gray-700"
                          onClick={() => {
                            setIsEditOpen(!isEditOpen);
                            setRevId(obj._id);
                            setNewReview(obj.review);
                            setReviewId(obj._id);
                          }}
                        />
                      </span>
                      {isEditOpen && revId == obj._id && (
                        <div className="absolute right-0 top-0 mt-6 mr-2 bg-white border rounded p-2 flex">
                          <button
                            className="text-red-600 hover:text-red-800 mr-2"
                            onClick={(e) => handleReviewDelete(e)}
                          >
                            Delete
                          </button>
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => setEdit(true)}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {edit && (
                    <div className="fixed inset-0 flex  justify-center z-50 top-56 shadow-md">
                      <div className="bg-white h-44 w-96 rounded-md pb-10">
                        <div className="flex justify-end pt-3 pe-3">
                          <button
                            onClick={() => {
                              setEdit(false);
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faXmark}
                              className="font-thin text-xl text-gray-400"
                            ></FontAwesomeIcon>
                          </button>
                        </div>
                        <div className="text-center font-semibold">
                          <h1>Edit Review</h1>
                        </div>
                        <div className="mb-3 mt-3 mx-4">
                          <label
                            htmlFor="formInputControl1"
                            className="text-sm "
                          ></label>
                          <input
                            type="text"
                            id="formInputControl1"
                            className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            name="review"
                            value={newReview}
                            onChange={(e) => editReview(e)}
                          />
                        </div>
                        <div className="text-center pb-3">
                          <button
                            className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md hover:bg-gray-700 transition duration-150 ease-out"
                            onClick={(e) => handleReviewUpdate(e)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-800">
            No reviews yet. Be the first one to post a review.
          </div>
        )}
        {courseDetails.students.includes(studId) &&
        !allReviews.includes(ObjectId(studId)) ? (
          <div>
            <form action="">
              <div className="mt-3">
                <textarea
                  name="review"
                  id="formInputControl5"
                  className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  cols={10}
                  rows={4}
                  style={{ resize: "none" }}
                  placeholder="Write your review here..."
                  value={review}
                  onChange={(e) => handleReviewChange(e)}
                >
                  {review}
                </textarea>
                <p className="text-red-600 text-sm mb-2">{err.reviewErr}</p>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md hover:bg-gray-700 transition duration-150 ease-out"
                  onClick={(e) => handleReviewSubmit(e)}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* rating modal */}
      {isOpen && (
        <RatingsAndReviews
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          courseId={courseId}
          setRate={setRate}
          rate={rate}
        />
      )}
    </div>
  );
}

export default CourseDetails;
