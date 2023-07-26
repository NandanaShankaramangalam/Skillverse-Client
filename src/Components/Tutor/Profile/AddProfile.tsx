import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import AWS from 'aws-sdk'
import Resizer from "react-image-file-resizer";
import { api } from '../../../services/axios';
import  { s3Config }  from '../../../s3Config';
import { myBucket } from '../../../s3Config';
import { useDispatch, useSelector } from 'react-redux';
import { ValidateAddProfile } from './ValidateAddProfile';
interface ProfileProps{
    setAddProfile : Function;
}

interface ErrState {
    image?: string;
    description?: string;
    profile?: string;
    niche?:string
  }

// const S3_BUCKET =s3Config.bucketName;
// const REGION =s3Config.region;

// AWS.config.update({
//   accessKeyId: s3Config.accessKeyId,
//   secretAccessKey: s3Config.secretAccessKey
// })

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET},
//   region: REGION,
// })


// const myBucket = new AWS.S3({
//   region: REGION,
// });
function AddProfile(props:ProfileProps) {
    
    const [progress , setProgress] = useState(0);
    const [selectedImage, setSelectedImage] = useState<File>(new File([], ''));
    const [selectedProfile, setSelectedProfile] = useState<File>(new File([], ''));
    const [description, setDescription] = useState('');
    const [niche, setNiche] = useState('');
    const [err,setErr] = useState<ErrState>({profile:'',niche:'',image:'',description:''});
    const dispatch = useDispatch();
    const { tutUsername, tutEmail, tutId } = useSelector((state: any) => state.tutor);
    
    const resizeFile = (file: File): Promise<Blob> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri: string | Blob | ProgressEvent<FileReader>) => {
          if (typeof uri === "string") {
            resolve(new Blob([uri], { type: "image/jpeg" }));
          } else if (uri instanceof Blob) {
            resolve(uri);
          }
        },
        "blob"
      );
    });
  
    const uploadFile = async(e:React.MouseEvent<HTMLButtonElement>,bannerFile:any,profileFile:any) => {
        e.preventDefault();
  try{
   
    ValidateAddProfile(selectedProfile,niche,selectedImage,description,err,setErr)
    if(err.profile==='' && err.niche==='' && err.image==='' && err.description===''){
        const resizedBannerImage = await resizeFile(bannerFile);
        const resizedProfileImage = await resizeFile(profileFile);

        const s3 = new AWS.S3({
          accessKeyId: s3Config.accessKeyId,
          secretAccessKey: s3Config.secretAccessKey,
          region: s3Config.region,
        });
    const bannerParams = {
            Body: resizedBannerImage as Blob,
            Bucket: s3Config.bucketName,
            Key: `images/${bannerFile.name}`
        };
    const profileParams = {
            Body: resizedProfileImage as Blob,
            Bucket: s3Config.bucketName,
            Key: `profile/${profileFile.name}`
        };
        
        Promise.all([
          s3.upload(profileParams).promise(),
          s3.upload(bannerParams).promise(),
        ])
          .then(async([profileResponse, bannerResponse]) => {
            console.log('Video upload response:', profileResponse);
            console.log('Thumbnail upload response:', bannerResponse);
            // `https://${s3Config.bucketName}.s3.${s3Config.region}.amazonaws.com/videos/vdo-126.mp4`
            const profileLocations = `${process.env.REACT_APP_S3BUCKET_URL}/${profileResponse.Key}`;
            const bannerLocations = `${process.env.REACT_APP_S3BUCKET_URL}/${bannerResponse.Key}`;
            
            const profileLocation = `${profileResponse.Key}`;
            const bannerLocation = `${bannerResponse.Key}`
            console.log('Profile location:',profileLocation);
            console.log('Banner location:', bannerLocation);
    
            if(profileLocation && bannerLocation){
              const result = await api.post('/tutor/add-profile',{profileLocation,bannerLocation,niche,description,tutId},{ withCredentials: true })
              console.log('result=',result);
            }
          })
          .catch((error) => {
            console.log('Error uploading files:', error);
          });

        }

  }catch(err){
    console.log(err);
    
  }
        
    }
    
    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] || null;
        setSelectedProfile(file as File);
      };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] || null;
        setSelectedImage(file as File);
      };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
      };
    const handleNicheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNiche(e.target.value);
      };

    const closeModal = () =>{
        props.setAddProfile(false);
    }
  return (
    <div>
        <div className="absolute inset-0  top-20 left-72 flex items-center justify-center z-50">
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
              Profile Image
            </label>
            <input accept="image/jpeg,image/png,image/gif" name="profile"
             onChange={handleProfileImageChange}
             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400" aria-describedby="file_input_help" id="formInputControl1" type="file"/>
             <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
            </div>
            <p className="text-red-600 text-sm mb-1">{err.profile}</p>

            <div className="mb-2 mt-3">
            <label htmlFor="formInputControl2" className="text-sm ">
              Niche
            </label>
            <input typeof='text' name="niche"
             onChange={handleNicheChange}
             placeholder='eg : Artist and designer'
             className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" aria-describedby="file_input_help"/>
             {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}
            </div>
            <p className="text-red-600 text-sm mb-1">{err.niche}</p>

            <div className="mb-2 mt-3">
            <label htmlFor="formInputControl3" className="text-sm ">
              Banner Image
            </label>
            <input accept="image/jpeg,image/png,image/gif" name="thumbnail"
             onChange={handleImageChange}
             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
             <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
            </div>
            <p className="text-red-600 text-sm mb-1">{err.image}</p>

              <div className="mb-3 mt-3">
            <label htmlFor="formInputControl4" className="text-sm ">
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
          <p className="text-red-600 text-sm mb-1">{err.description}</p>

              <div className='flex justify-center'>
                <button onClick={(e) => uploadFile(e,selectedImage,selectedProfile)} className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out">
                 Add 
                </button> 
              </div>
            </form>
          </div>
        </div>
    

    </div>
  )
}

export default AddProfile