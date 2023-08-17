import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../../../services/axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { s3Config } from "../../../s3Config";
import AWS from "aws-sdk";
import "./CourseTutorial.css";
function CourseTutorial() {
  const s3 = new AWS.S3();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { video, Vtitle, Vdescription } = location.state;
  const [videoUrl, setVideoUrl] = useState(video);
  const videoName = videoUrl.split("/").pop();
  const [img, setImg] = useState("");
  const imgName = img.split("/").pop();
  const [title, setTitle] = useState(Vtitle);
  const [description, setDescription] = useState(Vdescription);
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    fee: "",
    category: "",
    thumbnail: "",
    video: "",
    tutId: "",
    description: "",
    tutorial: [
      { id: "", title: "", video: "", thumbnail: "", description: "" },
    ],
  });

  const [item, setItem] = useState({
    id: "",
    title: "",
    video: "",
    thumbnail: "",
    description: "",
    index: 0,
  });
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File>(new File([], ""));
  const [ImgLocation, setImgLocation] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<File>(new File([], ""));
  const [VdoLocation, setVdoLocation] = useState("");
  const [vdoId, setVdoId] = useState("");

  useEffect(() => {
    setNewTitle(item.title);
    setNewDescription(item.description);
  }, [item]);
  useEffect(() => {
    const fetchCourseData = async () => {
      const courseData = await api.get(`/tutor/course-details/${courseId}`);
      console.log("cosesṣss=", courseData.data);

      setCourseDetails(courseData.data.courseData);
    };
    fetchCourseData();
  }, [courseId]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewDescription(e.target.value);
  };
  const handleUndo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setNewTitle(title);
    setNewDescription(description);
    setImgLocation("");
    setVdoLocation("");
  };

  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;
    setSelectedImage(file as File);
    console.log("sellllimg=", file);
    await uploadImage(e, file);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;
    setSelectedVideo(file as File);
    console.log("sellllvdo=", file);
    await uploadVideo(e, file);
  };

  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    imgFile: any
  ) => {
    e.preventDefault();
    console.log("immm=", imgFile);

    const imgParams = {
      Body: selectedImage,
      Bucket: s3Config.bucketName,
      Key: `courseThumbnails/${imgFile.name}`,
    };
    await s3
      .upload(imgParams)
      .promise()
      .then((imgResponse) => {
        // Handle the result of the upload
        const imgLoc = `${imgResponse.Key}`;
        setImgLocation(imgLoc);
        console.log("sel imgg:", selectedImage);
        console.log("Img location:", imgLoc);
        console.log("Img upload success:", imgResponse);
      })
      .catch((error) => {
        // Handle any errors that occurred during the upload
        console.error("Profile upload error:", error);
      });
  };

  const uploadVideo = async (
    e: React.ChangeEvent<HTMLInputElement>,
    vdoFile: any
  ) => {
    e.preventDefault();
    console.log("vdoo=", vdoFile.name);
    const videoParams = {
      Body: selectedVideo,
      Bucket: s3Config.bucketName,
      Key: `courses/${vdoFile.name}`,
    };
    s3.upload(videoParams)
      .promise()
      .then((vdoResponse) => {
        // Handle the result of the upload
        const vdoLoc = `${vdoResponse.Key}`;
        setVdoLocation(vdoLoc);
        console.log("Vdo location:", vdoLoc);
        console.log("Vdo upload success:", vdoResponse);
      })
      .catch((error) => {
        // Handle any errors that occurred during the upload
        console.error("Video upload error:", error);
      });
  };

  const handleEditTutorial = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const result = await api.post(
      "/tutor/edit-tutorials",
      {
        courseId,
        newTitle,
        newDescription,
        ImgLocation,
        VdoLocation,
        img,
        videoUrl,
        vdoId,
        index: item.index,
      },
      { withCredentials: true }
    );
  };
  return (
    <div>
      <div
        className={`grid grid-cols-12  h-screen relative ${
          isEditing ? "blur" : ""
        }`}
      >
        <div className="col-span-12 bg-slate-100 md:col-span-8  align-middle pt-6">
          <div className=" flex justify-center">
            <video
              controls
              onContextMenu={(e) => e.preventDefault()}
              src={`${process.env.REACT_APP_S3BUCKET_URL}/${videoUrl}`}
              className="w-full h-96"
              controlsList="nodownload"
              autoPlay
            ></video>
          </div>
          <div className="pt-4 ps-10 md:mt-0">
            <h1 className="text-xl font-semibold">{title}</h1>
            <p>{description}</p>
          </div>
        </div>

        <div className="col-span-12 bg-slate-300 md:col-span-4  pt-6 overflow-y-auto">
          {courseDetails.tutorial.map((item, index) => {
            return (
              <>
                <div
                  className={`relative ps-5 items-center py-2 rounded ${
                    videoUrl === item.video ? "shadow border bg-slate-900" : ""
                  }`}
                >
                  <div className="flex justify-start relative">
                    <div>
                      <img
                        src={`${process.env.REACT_APP_S3BUCKET_URL}/${item.thumbnail}`}
                        alt={courseDetails.title}
                        className="h-24 w-36 rounded-md"
                        onClick={() => {
                          setVideoUrl(item.video);
                          setTitle(item.title);
                          setDescription(item.description);
                        }}
                      />
                    </div>
                    <div>
                      <h1
                        key={index}
                        className={`ml-4 ${
                          videoUrl === item.video ? "text-white" : ""
                        }`}
                      >
                        {index + 1}. {item.title}
                      </h1>
                    </div>
                    {videoUrl === item.video ? (
                      <div className="absolute top-0 right-1.5 pt-1 flex justify-end ps-10">
                        <span>
                          <BsThreeDotsVertical
                            className={`${
                              videoUrl === item.video
                                ? "text-white"
                                : "text-black"
                            }`}
                            onClick={() => {
                              setIsOpen(!isOpen);
                              setImg(item.thumbnail);
                              console.log("item", item);
                              setVdoId(item.id);
                              console.log("vidd=", item.id);
                              setItem({ ...item, index: index });
                            }}
                          />
                        </span>
                        {isOpen && (
                          <div className="flex absolute right-0 top-0 mt-8 mr-2 bg-white border rounded p-2">
                            <button className="text-red-600 hover:text-red-800 mr-2">
                              Delete
                            </button>
                            <button
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => setIsEditing(true)}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {/* modal */}
      {isEditing && (
        <div className="fixed inset-0 flex  justify-center z-50 top-0">
          <div className="bg-white h-3/4 w-2/4 mt-10 rounded-md overflow-y-auto pb-10">
            <div className="flex justify-end pt-3 pe-3">
              <button onClick={() => setIsEditing(false)}>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="font-thin text-4xl text-gray-400"
                ></FontAwesomeIcon>
              </button>
            </div>
            {/* Your modal content goes here */}
            <div>
              <div className="text-center">
                <h1 className="text-2xl">Edit Tutorials</h1>
              </div>

              <form action="" className=" w-full px-20 ">
                <div className="mb-3 mt-5">
                  <label htmlFor="formInputControl1" className="text-sm ">
                    Title
                  </label>
                  <input
                    type="text"
                    id="formInputControl1"
                    className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    name="title"
                    value={newTitle}
                    onChange={handleTitleChange}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="formInputControl2"
                    className="block text-sm mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="formInputControl2"
                    className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    cols={30}
                    rows={10}
                    style={{ resize: "none" }}
                    value={newDescription}
                    onChange={handleDescriptionChange}
                  ></textarea>
                </div>
                <div>
                  <label
                    className="block mb-1 text-sm font-medium text-gray-900"
                    htmlFor="file_input"
                  >
                    Upload Thumbnail
                  </label>
                  <input
                    accept="image/jpeg,image/png,image/gif"
                    name="thumbnail"
                    onChange={(e) => handleImgUpload(e)}
                    className="block py-1 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    id="file_input"
                    type="file"
                  />
                  <h1 className="text-gray-500 text-sm">{imgName}</h1>
                </div>
                <div className="mt-3">
                  <h1 className="text-sm">Upload video tutorial</h1>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <h1 className="text-gray-500 text-sm">{videoName}</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          MP4, MOV, AVI, etc.
                        </p>
                      </div>
                      <input
                        onChange={(e) => handleVideoUpload(e)}
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="video/mp4,video/x-m4v,video/*"
                        name="course"
                      />
                    </label>
                  </div>
                </div>
                <div className="mt-3 flex justify-center gap-2">
                  <button
                    onClick={(e) => handleUndo(e)}
                    className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out"
                  >
                    Undo Changes
                  </button>
                  <button
                    onClick={(e) => handleEditTutorial(e)}
                    className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseTutorial;
