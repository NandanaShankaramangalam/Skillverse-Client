import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { api } from "../../../services/axios";
import ReactS3Client from 'react-aws-s3-typescript';
import AWS from 'aws-sdk'

// import ReactS3 from 'react-aws-s3';
import {s3Config} from '../../../s3Config'

interface VideoUpload {
  setIsOpen: Function;
}
interface UploadDetails{
    title:string;
    fee:string;
    description:string;
    course:File | null;
    thumbnail:File | null;
}
const S3_BUCKET ='skillverse-bucket';
const REGION ='ap-south-1';

AWS.config.update({
  accessKeyId: 'AKIAWU6TXFWYWDMHWFEK',
  secretAccessKey: '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'
})

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})
// const config = {
//   bucketName: 'skillverse-bucket',
//   region: 'ap-south-1',
//   accessKeyId: 'AKIAWU6TXFWYWDMHWFEK',
//   secretAccessKey: 'AKIAWU6TXFWYWDMHWFEK',
//   acl:'public-read'
// }

function VideoUpload(props: VideoUpload) {
    const [progress , setProgress] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState<File>(new File([], '')); // Initialize with an empty File object
    // const [selectedVideo, setSelectedVideo] = useState<File | null>(null); // Initialize with an empty File object

    const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [fee, setFee] = useState('');
    const [description, setDescription] = useState('');

    

    // const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file: File | null = e.target.files?.[0] || null;
    //     setSelectedVideo(file);
    //   };
    const uploadFile = (e:React.MouseEvent<HTMLButtonElement>,file:any) => {
      e.preventDefault();
try{
  console.log('kkrrrr');
  
  const params = {
          // ACL: 'public-read',
          Body: file,
          Bucket: S3_BUCKET,
          Key: `videos/${file.name}`
      };

      myBucket.putObject(params)
          .on('httpUploadProgress', (evt) => {
              setProgress(Math.round((evt.loaded / evt.total) * 100))
          }).on("success",(response)=>{
            console.log('res',response.data);
            const fileLocation = `https://s3.amazonaws.com/${params.Bucket}/${params.Key}`;
            // console.log("Location:", response.Location);
            console.log('File location:', fileLocation);
          })
          .send((err,data) => {
              if (err) console.log(err)
              else console.log('data=',data);
          })
}catch(err){
  console.log(err);
  
}
      
  }


    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // const file: File | null = e.target.files?.[0] || null;
      const file: File | null = e.target.files?.[0] || null;
      // // setSelectedVideo((prevFile) => file); // Pass 'file' directly to the setter function
      setSelectedVideo(file as File);

      // const file = e.target.files?.[0];
      // // setSelectedVideo((prevFile) => file); // Pass 'file' directly to the setter function
      // setSelectedVideo(file);
    };
    
      const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] || null;
        setSelectedThumbnail(file);
      };
    
      const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
      };
    
      const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFee(e.target.value);
      };
    
      const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
      };

     

      const handleVideoUpload = async(e: React.FormEvent)=>{
        e.preventDefault()
        try{
          const s3 = new ReactS3Client(s3Config);

          const videoFile = `video-${new Date().getTime()}`;
          const imageFile = `image-${new Date().getTime()}`;
          console.log('kkkkkk');
          
          // const res = await s3.uploadFile(selectedVideo, videoFile);
          // const res = await s3.uploadFile(selectedVideo, config.bucketName);
          // const res = await S3FileUpload.uploadFile(selectedVideo, s3Config)
          const res = await s3.uploadFile(selectedVideo, videoFile)
           
            console.log('vdo res=',res);
        }catch (exception) {
          console.log(exception);
          /* handle the exception */
      }
      }


  const closeModal = () => {
    props.setIsOpen(false);
  };


//   const [selectData,setSelectData] = useState<UploadDetails>({title:'',fee:'',description:'',course:null,thumbnail:null});
//   const addData = ((e: React.ChangeEvent<HTMLInputElement>|React.ChangeEventHandler<HTMLTextAreaElement>)=>{
//     // validate(e.target.name, e.target.value, errors,setErrors,student.password)
//     setSelectData({...selectData,[e.target.name]:e.target.value,[e.target.name]:e.target.files?.[0] || null});
//     // validate(e.target.name, e.target.value, errors,setErrors,student.password)
//   })
//   const handleUpload = async(e:React.FormEvent) =>{
//     e.preventDefault();
//     try{
//        if(selectData.title && selectData.fee && selectData.description && selectData.course && selectData.thumbnail){
//         const {data} = await api.post('/tutor/video-upload',{...selectData},{withCredentials:true})
//         console.log('data',data);
//        }
//     }catch(error){
//         console.log(error);
        
//     }
//   }

// const handleUpload = async(e:React.FormEvent) =>{
//         e.preventDefault();
//         try{
//            if(title && fee && description && selectedVideo && selectedThumbnail){
//             const videoFormData = new FormData();
//             videoFormData.append('video', selectedVideo);
//             console.log('sel vdo',selectedVideo);
            
//             const thumbnailFormData = new FormData();
//             thumbnailFormData.append('thumbnail', selectedThumbnail);
//             console.log('sel vdo',selectedThumbnail);

//             const {data} = await api.post('/tutor/video-upload',{title,fee,description,videoFormData,thumbnailFormData},{withCredentials:true})
//             console.log('data',data);
//            }
//         }catch(error){
//             console.log(error);
            
//         }
//       }
    


  return (
    // {/* // fixed top-8 right-8 flex items-center justify-center h-screen w-screen */}
    // {/* <div className="fixed top-32 left-12 flex  justify-center w-screen h-96"> */}

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
        <form
          // onSubmit={handleVideoUpload}
        >
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
                // onChange={addData}
                onChange={handleTitleChange}
              />
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
                // onChange={addData}
                onChange={handleFeeChange}
              />
            </div> 
          </div>
          {/* bbbbbb */}
          <div className="mb-1 mt-3 flex">
          <div className="mr-4">
              <label htmlFor="formInputControl2" className="block text-sm mb-1">
                Category
              </label>
              <input
                type="text"
                id="formInputControl2"
                className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                name="fee"
                // onChange={addData}
                onChange={handleFeeChange}
              />
            </div> 
            


          <div>
              <label htmlFor="formInputControl2" className="block text-sm mb-1">
                Subcategory
              </label>
              <input
                type="text"
                id="formInputControl2"
                className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                name="fee"
                // onChange={addData}
                onChange={handleFeeChange}
              />
            </div> 
            
             </div>
           {/* hkhhhh */}
         
          <div>
            <label htmlFor="formInputControl3" className="block text-sm mb-1">
              Description
            </label>
            <textarea
              name="description"
              id="formInputControl3"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              cols={30}
              rows={10}
              style={{ resize: "none" }}
            //   value={(e)=>e.target.value}
            //   onChange={addData}
            value={description} 
            onChange={handleDescriptionChange}
            ></textarea>
          </div>
          
<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload Thumbnail</label>
<input accept="image/jpeg,image/png,image/gif" name="thumbnail"
//  onChange={handleUpload}
onChange={handleThumbnailChange}
 className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
<p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>


          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
              <input id="dropzone-file" type="file" className="hidden" accept="video/mp4,video/x-m4v,video/*"  name="course"onChange={handleVideoChange}/>
              {/* <input id="dropzone-file" type="file" className="hidden" accept="video/mp4,video/x-m4v,video/*"  name="course" onChange={handleUpload}/> */}
            </label>
          </div>

          <div className="flex justify-center mt-2">
            <button onClick={(e) => uploadFile(e,selectedVideo)} className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out" >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VideoUpload;
