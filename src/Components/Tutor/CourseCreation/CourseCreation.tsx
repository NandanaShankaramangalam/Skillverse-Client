import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { validate } from './CourseValidate';

interface CourseProps {
    setIsOpen : (value : boolean) => void;
}
function CourseCreation(props : CourseProps) {
    const [progress , setProgress] = useState(0);
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
        const handleCourseCreation = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            validate(title,description,selectedThumbnail,selectedVideo,err,setErr)
            console.log('err=',err);
            if(err.title === '' && err.description === '' && err.thumbnail === '' && err.video === ''){
             console.log('nsn');
            //   uploadFiles(e)
            console.log('nummm');
            
            }
          }
  
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