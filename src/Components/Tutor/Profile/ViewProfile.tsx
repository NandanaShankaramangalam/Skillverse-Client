import React, { useEffect, useState } from 'react'
import AWS from 'aws-sdk';
import  { s3Config, s3URL }  from '../../../s3Config';
import { api } from '../../../services/axios';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';

function ViewProfile() {
  
  AWS.config.update({
    region: s3Config.region,
  });
  
  const s3 = new AWS.S3();
  
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const { tutId } = useSelector((state: any) => state.tutor);

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
    // <div>
    //   <h1>Profile</h1>
    //   {imageUrl && <img className='h-52' src={imageUrl && imageUrl} alt="Uploaded" />}
    //   {/* {imageUrl && 
    //     <video controls>
    //       <source src={imageUrl && imageUrl}/>
    //   </video>} */}
    // </div>

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
            <h1 className='text-xl text-slate-950'>Nandana</h1>
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
        {/* <div className=' mb-20 pl-48 md:pl-32'>
          
            <ul className="space-y-4">
            <li><FontAwesomeIcon icon={faUser} className='text-lg text-custom-blue'/><span className='ml-4 text-base'>Personal Info</span></li>
            <li><FontAwesomeIcon icon={faBook} className='text-lg text-cyan-600'/><span className='ml-4 text-base'>Courses</span></li>
            <li><FontAwesomeIcon icon={faUsers} className='text-lg text-yellow-400'/><span className='ml-3 text-base'>Students</span></li>
            <li><FontAwesomeIcon icon={faCalendar} className='text-lg text-green-600'/><span className='ml-4 text-base'>Slots</span></li>
            <li><FontAwesomeIcon icon={faMessage} className='text-lg text-violet-950'/><span className='ml-4 text-base'>Message</span></li>
            <li><FontAwesomeIcon icon={faCoins} className='text-lg text-red-800'/><span className='ml-4 text-base'>Revenue</span></li>
            </ul>  
           
        </div> */}
  </div>
   
  <div className="md:col-span-5 col-span-7 pt-16"> 
  {/* <h1>Profile</h1> */}
  {/* <div className='ms-36'> */}
    {/* {imageUrl && <img className='h-60' src={imageUrl && imageUrl} alt="Uploaded" />} */}
  {/* </div> */}


  {/* {imageUrl && (
        <picture>
          <source srcSet={`${imageUrl}`} />
          <img
            src={`${imageUrl}`}
            alt="S3 Bucket Image"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </picture>
      )} */}


<div className='h-96 ms-36 mt-5'>
  {imageUrl && (
        <img
          src={imageUrl}
          alt="S3 Bucket Image"
          className="banner-image object-cover h-full"
        />
      )}
</div>
<div className='mt-5'>
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
  </div>
  )
}

export default ViewProfile