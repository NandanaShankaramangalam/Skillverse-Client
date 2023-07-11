import React, { useEffect, useState } from 'react'
import AWS from 'aws-sdk';
import  { s3Config, s3URL }  from '../../../s3Config';
import { api } from '../../../services/axios';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';

function ViewProfile() {
  
  AWS.config.update({
    region: s3Config.region,
  });
  
  const s3 = new AWS.S3();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const { tutId,tutUsername } = useSelector((state: any) => state.tutor);
  const [isOpen,setIsOpen] = useState(false);

  useEffect(()=>{
    const fetchProfileData = async() =>{
      try{
        const profileData = await api.get(`/tutor/profile/${tutId}`)
        console.log('profdata=',profileData.data.profileData);
        const{fileLocation,description} = profileData.data.profileData
        setDescription(description);
        console.log('file=',fileLocation);
        const params = {
          Bucket: s3Config.bucketName,
          // Key: `https://s3.console.aws.amazon.com/s3/object/skillverse-bucket?region=ap-south-1&prefix=images/Copy+%284%29.png`, // Provide the path to your uploaded image
          // Key: `videos/video-up.mp4`, // Provide the path to your uploaded image
          Key: `${fileLocation}`, // Provide the path to your uploaded image
          // Key: `https://skillverse-bucket.s3.ap-south-1.amazonaws.com/images/mongo.png`, // Provide the path to your uploaded image
          // Key: `https://skillverse-bucket.s3.amazonaws.com/images/mongo.png`
        };
        console.log('url=',params.Key);
        
        const url = await s3.getSignedUrlPromise('getObject', params);
        // const urls = url.split("https://skillverse-bucket.s3.ap-south-1.amazonaws.com/")[1] 
        // const last = urls.split("?")[0]
        console.log('uuuurrrll==',url);


        // const body = await s3.getObject(params).promise();
        // const url = URL.createObjectURL(new Blob([body.Body as ArrayBuffer]));
        // console.log('new url=',url);
        
        setImageUrl(url);

      }catch (error) {
        console.error('Error retrieving the image:', error);
      }
    }
    fetchProfileData();

  },[])

  return (
  
  <div>
    <Navbar/>
  <div className="grid grid-cols-7 gap-4 ">
  <div className="md:col-span-2 col-span-7 bg-gray-100 pt-12"> 
  {/* <SideNavbar/> */}
  <div className='text-center mt-5'>
           <div className='w-32 h-32 rounded-full overflow-hidden bg-gray-600 mx-auto'>  
           <img src="./images/photo.jpg" alt="" /> 
           </div>
           <div className='mt-2'>
            <h1 className='text-xl text-slate-950'>{tutUsername}</h1>
           </div>
           <div className='mt-1 mb-2'>
            <h1 className='text-sm text-gray-800'>Artist and Designer</h1>
           </div>
           <div className='bg-custom-blue rounded-md w-20 mx-auto'>
             <span className='text-neon-green text-sm font-bold'>Teacher</span>
           </div>
           <div className='mb-8 mt-5 w-60 mx-auto'>
            <hr className='border border-black'/>
           </div>
        </div>
       
  </div>
   
  <div className="md:col-span-5 col-span-7 "> 
<div className='text-end mr-2 pt-2'>
  <button onClick={()=>setIsOpen(true)}>
    <FontAwesomeIcon icon={faPenToSquare} />
  </button>
</div>
<div className='h-96 ms-36 mt-5 pt-8'>
  {imageUrl && (
        <img
          src={imageUrl}
          alt="S3 Bucket Image"
          className="banner-image object-cover h-full"
        />
      )}
</div>
<div className='mt-5 mb-28'>
  <span className='font-bold text-xl'>About me</span>
  <p className="text-gray-700 mt-2 text-base whitespace-pre-line">{description}</p>
  {/* {description.split('\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        {paragraph}
        <br />
      </React.Fragment>
    ))} */}
</div>

  </div>
  </div>
  {isOpen && <EditProfile isOpen={isOpen} setIsOpen={setIsOpen}/>}
  </div>
  )
}

export default ViewProfile