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
import Footer from '../../Footer/Footer';


function ViewProfile() {
  
  AWS.config.update({
    region: s3Config.region,
  });
  
  const s3 = new AWS.S3();
  const navigate = useNavigate();
  const [niche,setNiche] = useState<string>('');
  const [profile,setProfile] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const { tutId,tutUsername } = useSelector((state: any) => state.tutor);
  const [isOpen,setIsOpen] = useState(false);
  const [data,setData] = useState({});
  // profile && console.log('hiiiiiiiiii=',profile);
  
  useEffect(()=>{
    const fetchProfileData = async() =>{
      try{
        console.log('tutid===',tutId);
        
        const profileData = await api.get(`/tutor/profile/${tutId}`)
        if(profileData.data.profileData){
        console.log('profdata=',profileData.data.profileData);
        const{profileLocation,bannerLocation,description,niche} = profileData.data.profileData
       
        setDescription(description);
        setImageUrl(bannerLocation)
        setProfile(profileLocation);
        setNiche(niche);
        console.log('bannerfile=',bannerLocation);
        console.log('profile=',profileLocation);
         }

      }catch (error) {
        console.error('Error retrieving the image:', error);
      }
    }
    fetchProfileData();

  },[])
  const dataFromChild = (data:any) =>{
    console.log('frm child=',data);
    
  }
  return (
  
  <div>
    <Navbar/>
  <div className="grid grid-cols-7 gap-4 ">
  <div className="md:col-span-2 col-span-7 bg-gray-100 pt-12"> 
  <div className='text-center mt-5'>
           <div className='w-32 h-32 rounded-full overflow-hidden mx-auto border border-black'>  
           <img src={`${process.env.REACT_APP_S3BUCKET_URL}/${profile}`} alt=""/> 
           </div>
           <div className='mt-2'>
            <h1 className='text-xl text-slate-950'>{tutUsername}</h1>
           </div>
           <div className='mt-1 mb-2'>
            <h1 className='text-sm text-gray-800'>{niche}</h1>
           </div>
           <div className='bg-custom-blue rounded-md w-20 mx-auto'>
             <span className='text-neon-green text-sm font-bold'>Teacher</span>
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
          src={`${process.env.REACT_APP_S3BUCKET_URL}/${imageUrl}`}
          alt="S3 Bucket Image"
          className="banner-image object-cover h-full"
        />
      )}
</div>
<div className='mt-5 mb-28'>
  <span className='font-bold text-xl'>About me</span>
  <p className="text-gray-700 mt-2 text-base whitespace-pre-line">{description}</p>
</div>
  </div>
  </div>
  {isOpen && <EditProfile isOpen={isOpen} setIsOpen={setIsOpen} callback={dataFromChild}/>}
  <Footer/>
  </div>
  )
}

export default ViewProfile