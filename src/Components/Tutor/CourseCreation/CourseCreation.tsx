import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { validate } from './CourseValidate';
import { myBucket, s3Config } from '../../../s3Config';
import AWS from 'aws-sdk'
import { api } from '../../../services/axios';
import { useSelector } from 'react-redux';

interface CourseProps {
    setIsOpen : (value : boolean) => void;
    setEdit : Function;
}
function CourseCreation(props : CourseProps) {
    const [progress , setProgress] = useState(0);
    const tutorSlice = useSelector((state:any)=>state.tutor);
    const courseId = tutorSlice.courseId
    const [selectedVideo, setSelectedVideo] = useState<File>(new File([], '')); // Initialize with an empty File object
    const [selectedThumbnail, setSelectedThumbnail] = useState<File>(new File([], ''))
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [err,setErr] = useState({title:'',description:'',thumbnail:'',video:''})
    const closeModal = ()=>{
       props.setIsOpen(false)
    }

    

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] || null;
        setSelectedVideo(file as File);
        console.log('sel vdo = ',selectedVideo)
      };
      
        const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file: File | null = e.target.files?.[0] || null;
          console.log('file',file);
          setSelectedThumbnail(file as File);
          console.log('sel thumb = ',selectedThumbnail)
        };
      
        const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);

        };
      
        const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setDescription(e.target.value);
        };

        const uploadFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          if (!selectedVideo || !selectedThumbnail) {
            console.log('Please select both video and thumbnail files.');
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
            Key: `courses/${selectedVideo.name}`,
          };
      
          const thumbnailParams = {
            Body: selectedThumbnail,
            Bucket: s3Config.bucketName,
            Key: `courseThumbnails/${selectedThumbnail.name}`,
          };
      
          Promise.all([
            s3.upload(videoParams).promise(),
            s3.upload(thumbnailParams).promise(),
          ])
            .then(async([videoResponse, thumbnailResponse]) => {
              console.log('Video upload response:', videoResponse);
              console.log('Thumbnail upload response:', thumbnailResponse);
              // `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/videos/vdo-126.mp4`
              const videoLocations = `${process.env.REACT_APP_S3BUCKET_URL}/${videoResponse.Key}`;
              const thumbnailLocations = `${process.env.REACT_APP_S3BUCKET_URL}/${thumbnailResponse.Key}`;
              
              const videoLocation = `${videoResponse.Key}`;
              const thumbnailLocation = `${thumbnailResponse.Key}`
              console.log('Video location:', videoLocation);
              console.log('Thumbnail location:', thumbnailLocation);
      
              if(videoLocation && thumbnailLocation){
                console.log('abbbbaaaabbaaabb');
                
                const id = new Date();
                const result = await api.post('/tutor/upload-class',{videoLocation,thumbnailLocation,title,description,courseId,id},{ withCredentials: true })
                console.log('result=',result);
                console.log('res===',result.data);
                props.setIsOpen(false);
                window.location.reload();
              }
            })
            .catch((error) => {
              console.log('Error uploading files:', error);
            });
        };
      
      // if(err.title=='' && err.description=='' && err.thumbnail=='' && err.video==''){
        const handleCourseCreation = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            validate(title,description,selectedThumbnail,selectedVideo,err,setErr)
            console.log('err=',err);
            if(title&&description&&selectedThumbnail&&selectedVideo){
              setErr({title:"",description:"",thumbnail:"",video:""})
            }
            if(err.title === '' && err.description === '' && err.thumbnail === '' && err.video === ''&&title&&description&&selectedThumbnail&&selectedVideo){
             console.log('nsn');
              uploadFiles(e)
            console.log('nummm');
            
            }
           
          }
      // }
        
  
  return (
    <div className="absolute inset-0  top-20 left-72 flex items-center justify-center z-50 ">
      <div className="bg-white p-6 rounded-lg h-96 w-2/4 overflow-y-scroll  shadow-lg">
        <div className="flex justify-end">
          <button onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>
        <div className="text-center">
          <h1 className="font-bold text-xl">Create Course</h1>
        </div>
        <form
          // onSubmit={handleVideoUpload}
        >
          {/* <div className="mb-1 mt-3 flex"> */}
            <div className="mb-4 mt-3">
              <label htmlFor="formInputControl1" className="block text-sm mb-1">
                Title
              </label>
              <input
                type="text"
                id="formInputControl1"
                className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                name="title"
                // onChange={addData}
                onChange={handleTitleChange}
              />
              <p className="text-red-600 text-sm mb-3">{err.title}</p>
            </div>
          {/* </div> */}
         
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
            //   value={(e)=>e.target.value}
            //   onChange={addData}
            // value={description} 
            onChange={handleDescriptionChange}
            ></textarea>
            <p className="text-red-600 text-sm mb-2">{err.description}</p>
          </div>
          
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Thumbnail</label>
<input accept="image/jpeg,image/png,image/gif" name="thumbnail"
//  onChange={handleUpload}
 className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"
 onChange={handleThumbnailChange}
 />
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
<p className="text-red-600 text-sm mb-3">{err.thumbnail}</p>


          <div className="flex items-center justify-center w-full mt-4">
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
                {/* <p className="text-red-600 text-sm mb-3">{err.thumbnail}</p> */}
              </div>
              <input id="dropzone-file" type="file" className="hidden" accept="video/mp4,video/x-m4v,video/*"  name="course"  onChange={handleVideoChange}/>
              {/* <input id="dropzone-file" type="file" className="hidden" accept="video/mp4,video/x-m4v,video/*"  name="course" onChange={handleUpload}/> */}
            </label>
              </div>
              <div className="mt-2">
                <p className="text-red-600 text-sm mb-3">{err.video}</p>
              </div>
              
          <div className="flex justify-center mt-2">

            <button onClick={(e)=>{
                // closeModal();
                handleCourseCreation(e);
                // props.setIsOpen(false);
            }} 
            className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out" >
              Add
            </button>
            {/* <button onClick={(e) => uploadFiles(e)} className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out" >
              Add
            </button> */}
          </div>
        </form>
      </div>
    </div>
  )
}

export default CourseCreation