import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { api } from '../../../services/axios'

function TutorsProfile() {
    const location = useLocation();
    const {tutId,username} = location.state;
    const [niche,setNiche] = useState<string>('');
    const [profile,setProfile] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    
    useEffect(()=>{
        handleTutorProfileFetch();
    },[])
    const handleTutorProfileFetch = async() =>{
        const result = await api.get(`/view-tutor-profile/${tutId}`);
        if(result){
         console.log('reesss=',result.data.tutorData);
         const{profileLocation,bannerLocation,description,niche} = result.data.tutorData;
        //  console.log('proff=',profileLocation);
        //  console.log('bann=',bannerLocation);
         setDescription(description);
         setImageUrl(bannerLocation)
         setProfile(profileLocation);
         setNiche(niche);
         console.log('imgurl=',imageUrl);
         console.log('niche=',niche);
         
        }
    }
        
  return (
    <div>
  <div className="grid grid-cols-7 gap-4 ">
  <div className="md:col-span-2 col-span-7 bg-gray-100 pt-12"> 
  {/* <SideNavbar/> */}
  <div className='text-center mt-5'>
           <div className='w-32 h-32 rounded-full overflow-hidden mx-auto border border-black'>  
           <img src={`${process.env.REACT_APP_S3BUCKET_URL}/${profile}`} alt=""/> 
           </div>
           <div className='mt-2'>
            <h1 className='text-xl text-slate-950'>{username}</h1>
           </div>
           <div className='mt-1 mb-2'>
            <h1 className='text-sm text-gray-800'>{niche}</h1>
           </div>
           <div className='bg-custom-blue rounded-md w-20 mx-auto'>
             <span className='text-neon-green text-sm font-bold'>Teacher</span>
           </div>
           {/* <div className='mb-8 mt-5 w-60 mx-auto'>
            <hr className='border border-black'/>
           </div> */}
    </div>
       
  </div>
   
  <div className="md:col-span-5 col-span-7 "> 
<div className='text-end mr-2 pt-2'>
  {/* <button onClick={()=>setIsOpen(true)}>
    <FontAwesomeIcon icon={faPenToSquare} />
  </button> */}
</div>
<div className='h-96 ms-36 mt-5 pt-8'>
  {imageUrl && (
        <img
          src={`${process.env.REACT_APP_S3BUCKET_URL}/${imageUrl}`}
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
  </div>
  )
}

export default TutorsProfile