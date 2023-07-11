import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { api } from '../../../services/axios';
import AWS from 'aws-sdk'
import {s3Config} from '../../../s3Config'

interface ProfileProps{
  isOpen : boolean;
  setIsOpen : Function;
}
function EditProfile(props:ProfileProps) {
  const{tutId} = useSelector((state:any)=>state.tutor);
  const [description, setDescription] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File>(new File([], ''));
  const [image, setImage] = useState<string>('');

  AWS.config.update({
    accessKeyId: 'YOUR_ACCESS_KEY',
    secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
    region: 'YOUR_REGION'
  });
  
  const s3 = new AWS.S3();
  
  useEffect(()=>{
    fetchProfileData();
  },[])
  const fetchProfileData = async() =>{
      try{
       const profileData = await api.get(`/tutor/profile/${tutId}`);
       console.log('profdata=',profileData.data.profileData);
       const{fileLocation,description} = profileData.data.profileData;
       setDescription(description);
       console.log('file=',fileLocation);
       const fileName = fileLocation.split('/').pop();
       setImage(fileName)
       console.log('desc=',description);
       
       console.log("filename=",fileName);
      }catch (error) {
        console.error('Error retrieving the image:', error);
      }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files?.[0] || null;
    setSelectedImage(file as File);
  };

const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };


const handleProfileEdit = () =>{
  try{
    
  }catch (exception) {
    console.log(exception);
}
}


  const closeModal = () =>{
     props.setIsOpen(false)
  }
  return (
    <div>
        <div className="absolute inset-0  top-20 left-72 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg h-96 overflow-y-scroll  shadow-lg">
            {/* <div className='bg-custom-blue'>
                <h2 className="text-lg font-bold mb-4 text-center text-white">Add Category</h2>
            </div> */}
            <div className='flex justify-end'>
                <button onClick={closeModal}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
            </div>
            <h1 className='font-bold text-center mb-1 text-lg'>Create Profile</h1>
            <form >
              
            <div className="mb-2 mt-3">
            <label htmlFor="formInputControl1" className="text-sm ">
              Banner Image
            </label>
            <input accept="image/jpeg,image/png,image/gif" name="thumbnail"
             onChange={handleImageChange}
             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
             <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
             <p className='text-gray-700 text-sm'>{image}</p>

          </div>
          {/* <p className="text-red-600 text-sm">{err.image}</p> */}

              <div className="mb-3 mt-3">
            <label htmlFor="formInputControl2" className="text-sm ">
              About me
            </label>
            <textarea
              name="description"
              id="formInputControl3"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              cols={30}
              rows={10}
              style={{ resize: "none" }}
            
            value={description} 
            onChange={handleDescriptionChange}
            ></textarea>
          </div>
          {/* <p className="text-red-600 text-sm">{err.description}</p> */}

              <div className='flex justify-center'>
                <button onClick={()=>handleProfileEdit()}  className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out">
                 Add 
                </button> 
              </div>
            </form>
          </div>
        </div>
    

    </div>
  )
}

export default EditProfile