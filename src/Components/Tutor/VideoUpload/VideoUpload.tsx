import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { api } from "../../../services/axios";
import ReactS3Client from "react-aws-s3-typescript";
import AWS from "aws-sdk";
import { myBucket } from "../../../s3Config";
// import ReactS3 from 'react-aws-s3';
import { s3Config } from "../../../s3Config";
import courseValidate from "./CourseValidate";
import { useSelector } from "react-redux";

interface VideoUpload {
  // setIsOpen: Function;
  setIsOpen: (value: boolean) => void;
}
interface UploadDetails {
  title: string;
  fee: string;
  description: string;
  course: File | null;
  thumbnail: File | null;
}

interface CategoryData {
  category: string;
  subcategory: [string];
  _id: string;
  status: boolean;
}

// interface Subcategory{
//   category:string;
// }
// const S3_BUCKET ='skillverse-bucket';
// const REGION ='ap-south-1';

// AWS.config.update({
//   accessKeyId: 'AKIAWU6TXFWYWDMHWFEK',
//   secretAccessKey: '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'
// })

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET},
//   region: REGION,
// })

// const config = {
//   bucketName: 'skillverse-bucket',
//   region: 'ap-south-1',
//   accessKeyId: 'AKIAWU6TXFWYWDMHWFEK',
//   secretAccessKey: 'AKIAWU6TXFWYWDMHWFEK',
//   acl:'public-read'
// }

function VideoUpload(props: VideoUpload) {
  const [progress, setProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<File>(new File([], "")); // Initialize with an empty File object
  // const [selectedVideo, setSelectedVideo] = useState<File | null>(null); // Initialize with an empty File object

  const [selectedThumbnail, setSelectedThumbnail] = useState<File>(
    new File([], "")
  );
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isSubcatOpen, setIsSubcatOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [fee, setFee] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState<string[]>([]);
  const [subCates, setSubCates] = useState({ subcategory: [] });
  const [catData, setCatData] = useState<CategoryData[]>([]);
  const [err, setErr] = useState({
    title: "",
    fee: "",
    category: "",
    subcate: "",
    description: "",
    thumbnail: "",
    video: "",
  });
  const { tutId } = useSelector((state: any) => state.tutor);
  useEffect(() => {
    fetchCatData();
  }, []);

  const fetchCatData = async () => {
    try {
      const response = await api.get("/tutor/show-category");
      console.log("cate data res tut= ", response.data);
      // setData(response.data.cateData)
      setCatData(response.data.newArray);
      console.log("catdataaa=", catData);

      // console.log('cat data',response.data.newArray[0].category);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = (e: React.MouseEvent<HTMLButtonElement>, file: any) => {
    e.preventDefault();
    try {
      console.log("kkrrrr");

      const params = {
        Body: file,
        Bucket: s3Config.bucketName,
        Key: `videos/${file.name}`,
      };

      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .on("success", (response) => {
          console.log("res", response.data);
          const fileLocation = `https://s3.amazonaws.com/${params.Bucket}/${params.Key}`;
          console.log("File location:", fileLocation);
        })
        .send((err, data) => {
          if (err) console.log(err);
          else console.log("data=", data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // New vdo uplod function

  const uploadFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedVideo || !selectedThumbnail) {
      console.log("Please select both video and thumbnail files.");
      return;
    }

    const s3 = new AWS.S3({
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAccessKey,
      region: s3Config.region,
    });

    const videoParams = {
      Body: selectedVideo,
      Bucket: s3Config.bucketName,
      Key: `videos/${selectedVideo.name}`,
    };

    const thumbnailParams = {
      Body: selectedThumbnail,
      Bucket: s3Config.bucketName,
      Key: `thumbnails/${selectedThumbnail.name}`,
    };

    Promise.all([
      s3.upload(videoParams).promise(),
      s3.upload(thumbnailParams).promise(),
    ])
      .then(async ([videoResponse, thumbnailResponse]) => {
        console.log("Video upload response:", videoResponse);
        console.log("Thumbnail upload response:", thumbnailResponse);
        const videoLocations = `${process.env.REACT_APP_S3BUCKET_URL}/${videoResponse.Key}`;
        const thumbnailLocations = `${process.env.REACT_APP_S3BUCKET_URL}/${thumbnailResponse.Key}`;

        const videoLocation = `${videoResponse.Key}`;
        const thumbnailLocation = `${thumbnailResponse.Key}`;
        console.log("Video location:", videoLocation);
        console.log("Thumbnail location:", thumbnailLocation);

        if (videoLocation && thumbnailLocation) {
          const result = await api.post(
            "/tutor/create-course",
            {
              videoLocation,
              thumbnailLocation,
              title,
              fee,
              category,
              subcategory,
              description,
              tutId,
            },
            { withCredentials: true }
          );
          if (result) {
            console.log("result=", result);
            props.setIsOpen(false);
          }
        }
      })
      .catch((error) => {
        console.log("Error uploading files:", error);
      });
  };

  // End

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;
    setSelectedVideo(file as File);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;
    console.log("file", file);
    setSelectedThumbnail(file as File);
    console.log("sel thumb = ", selectedThumbnail);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFee(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleVideoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const s3 = new AWS.S3({
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
        region: s3Config.region,
      });

      const videoFile = `videos/${selectedVideo.name}`;
      const thumbnailFile = `thumbnails/${selectedThumbnail.name}`;

      console.log("kkkkkk");

      const videoParams: AWS.S3.PutObjectRequest = {
        Bucket: s3Config.bucketName,
        Key: videoFile,
        Body: videoFile as AWS.S3.Body,
      };
      const thumbnailParams: AWS.S3.PutObjectRequest = {
        Bucket: s3Config.bucketName,
        Key: thumbnailFile,
        Body: thumbnailFile as AWS.S3.Body,
      };

      const videoRes = await s3.upload(videoParams).promise();
      const thumbnailRes = await s3.upload(thumbnailParams).promise();

      console.log("vdo res=", videoRes);
      console.log("thumb res=", thumbnailRes);
      const videoFileLocation = `${videoParams.Key}`;
      const thumbnailFileLocation = `${thumbnailParams.Key}`;
      if (videoFileLocation && thumbnailFileLocation) {
        const result = await api.post(
          "/tutor/create-course",
          {
            videoFileLocation,
            thumbnailFileLocation,
            title,
            fee,
            category,
            subcategory,
            description,
            tutId,
          },
          { withCredentials: true }
        );
        console.log("result=", result);
      }
    } catch (exception) {
      console.log(exception);
    }
  };

  const closeModal = () => {
    props.setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsCatOpen(!isCatOpen);
  };
  const toggleSubcatDropdown = () => {
    setIsSubcatOpen(!isSubcatOpen);
  };
  const handleCategory = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cat: string
  ) => {
    e.preventDefault();
    setCategory(cat);
    const result = await api.get(`/tutor/get-subcategory/${cat}`);
    console.log("subyyy=", result.data);
    console.log("okk=", subCates);

    setSubCates(result.data.subCategory);
    setIsCatOpen(false);
  };
  const handleSubcategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cat: [string]
  ) => {
    e.preventDefault();
    setSubcategory(cat);
    setIsSubcatOpen(false);
  };
  const handleCourseCreation = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    courseValidate(
      title,
      fee,
      description,
      category,
      subcategory,
      selectedThumbnail,
      selectedVideo,
      err,
      setErr
    );
    console.log("err=", err);
    if (
      err.title === "" &&
      err.fee === "" &&
      err.description === "" &&
      err.category === "" &&
      err.subcate === "" &&
      err.thumbnail === "" &&
      err.video === ""
    ) {
      console.log("nsn");
      uploadFiles(e);
      console.log("nummm");
    }
  };

  return (
    <div className="absolute inset-0  top-20 left-72 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg h-96 overflow-y-scroll  shadow-lg">
        <div className="flex justify-end">
          <button onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>
        <div className="text-center">
          <h1 className="font-bold text-xl">Create Course</h1>
        </div>
        <form>
          <div className="mb-1 mt-3 flex">
            <div className="mr-4">
              <label htmlFor="formInputControl1" className="block text-sm mb-1">
                Title
              </label>
              <input
                type="text"
                id="formInputControl1"
                className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                name="title"
                onChange={handleTitleChange}
              />
              <p className="text-red-600 text-sm mb-3">{err.title}</p>
            </div>

            <div>
              <label htmlFor="formInputControl2" className="block text-sm mb-1">
                Fee
              </label>
              <input
                type="text"
                id="formInputControl2"
                className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                name="fee"
                onChange={handleFeeChange}
              />
              <p className="text-red-600 text-sm mb-3">{err.fee}</p>
            </div>
          </div>
          {/* Category dropdown */}
          <div className="mb-1 mt-3 flex gap-4">
            <div className="relative inline-block text-left">
              <span className="block text-sm mb-1">Category</span>
              <label className="relative">
                <input
                  type="text"
                  id="formInputControl4"
                  className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  name="fee"
                  onClick={toggleDropdown}
                  value={category}
                />

                <svg
                  className={`w-5 h-5 ml-2 transition-transform duration-200 absolute top-0 right-1 transform ${
                    isCatOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 01-.7-.3l-3.5-3.5a1 1 0 011.4-1.4L10 9.6l2.9-2.9a1 1 0 111.4 1.4l-3.5 3.5a1 1 0 01-.7.3z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>

              {isCatOpen && (
                <div className="overflow-y-scroll w-full h-32 absolute z-10 mt-2 bg-white border border-gray-300 divide-y divide-gray-200 rounded-md shadow-lg outline-none right-0">
                  <div className="py-1">
                    {catData.map((item, index) => {
                      return (
                        <button
                          onClick={(e) => handleCategory(e, item.category)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {item.category}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              <p className="text-red-600 text-sm mb-3">{err.category}</p>
            </div>

            <div className="relative inline-block text-left">
              <span className="block text-sm mb-1">Subcategory</span>
              <label className="relative">
                <input
                  type="text"
                  id="formInputControl4"
                  className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  name="fee"
                  onClick={toggleSubcatDropdown}
                  value={subcategory}
                />

                <svg
                  className={`w-5 h-5 ml-2 transition-transform duration-200 absolute top-0 right-1 transform ${
                    isSubcatOpen ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12a1 1 0 01-.7-.3l-3.5-3.5a1 1 0 011.4-1.4L10 9.6l2.9-2.9a1 1 0 111.4 1.4l-3.5 3.5a1 1 0 01-.7.3z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>

              {isSubcatOpen && (
                <div className="absolute z-10 mt-2 overflow-y-scroll h-32 w-full bg-white border border-gray-300 divide-y divide-gray-200 rounded-md shadow-lg outline-none right-0">
                  <div className="py-1">
                    {subCates.subcategory.map((item, index) => {
                      return (
                        <button
                          onClick={(e) => handleSubcategory(e, item)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <li style={{ listStyle: "none" }}>{item}</li>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="formInputControl5" className="block text-sm mb-1">
              Description
            </label>
            <textarea
              name="description"
              id="formInputControl5"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              cols={30}
              rows={10}
              style={{ resize: "none" }}
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <p className="text-red-600 text-sm mb-2">{err.description}</p>
          </div>

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload Thumbnail
          </label>
          <input
            accept="image/jpeg,image/png,image/gif"
            name="thumbnail"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={handleThumbnailChange}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
          <p className="text-red-600 text-sm mb-3">{err.thumbnail}</p>

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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  MP4, MOV, AVI, etc.
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="video/mp4,video/x-m4v,video/*"
                name="course"
                onChange={handleVideoChange}
              />
            </label>
          </div>
          <div className="mt-2">
            <p className="text-red-600 text-sm mb-3">{err.video}</p>
          </div>

          <div className="flex justify-center mt-2">
            <button
              onClick={(e) => handleCourseCreation(e)}
              className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VideoUpload;
