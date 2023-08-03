import Navbar from '../Navbar/Navbar';
import SideNavbar from '../SideNavbar/SideNavbar';
import React, { useEffect, useState } from 'react'
import { api } from '../../../services/axios'
import { useSelector } from 'react-redux';
import {validateInfo} from './ValidateInfo'

function Profile() {
  const{studId} = useSelector((state:any)=>state.student);
  const [fname,setFname] = useState<string>('');
  const [lname,setLname] = useState<string>('');
  const [username,setUsername] = useState<string>('');
  const [email,setEmail] = useState<string>('');
  const [err,setErr] = useState({fname:'',lname:'',username:'',email:''})
  const [isReadOnly,setIsReadOnly] = useState(false);
  useEffect(()=>{
    fetchData();
  },[])
 const fetchData = async() =>{
    const result = await api.get(`/personal-info/${studId}`);
    console.log('res info==',result.data);
    setFname(result.data.info.fname) 
    setLname(result.data.info.lname)
    setUsername(result.data.info.username)
    setEmail(result.data.info.email)
    
  }
  const handleInfoUpdate = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
    validateInfo(fname,lname,username,email,err,setErr);
    if(err.fname === '' && err.lname === '' && err.username === '' && err.email === ''){
        const result = await api.post(`/update-info/${studId}`,{fname,lname,username,email},{ withCredentials: true })
        console.log(result);
        if(result){
          setIsReadOnly(false);
        }
    }
  }
  return (
    <div>
        <Navbar/>
        <div className="grid grid-cols-7 gap-4">
            <div className="md:col-span-2 col-span-7 bg-yellow-300">
              <SideNavbar/>
            </div>
            <div className="md:col-span-5 col-span-7">
              {/* ---------------------- */}
              <div className=" w-full">
      <div className="flex justify-center mt-16 mb-6">
        <h1 className="font-extrabold text-3xl">Personal Info</h1>
      </div>
      <div className="max-w-md flex items-center justify-center  border border-gray-300 rounded-md bg-white mx-4 sm:mx-auto ">
        <form action="" className=" w-full p-6">
          <div className="mb-3 mt-5">
            <label htmlFor="formInputControl1" className="text-sm ">
              First Name 
            </label>
            <input
              type="text"
              id="formInputControl1"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="fname"
              value={fname}
              onChange={(e)=>setFname(e.target.value)}
            readOnly={!isReadOnly}
            />
          </div>
          {err.fname && <span className='text-sm text-red-600'>{err.fname}</span>}
          <div className="mb-1">
            <label htmlFor="formInputControl2" className="text-sm">
              Last Name
            </label>
            <input  
              type="text"
              id="formInputControl2"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="lname"
              value={lname}
              readOnly={!isReadOnly}
              onChange={(e)=>setLname(e.target.value)}
            />
          </div>
          {err.lname && <span className='text-sm text-red-600'>{err.lname}</span>}
          <div className="mb-1">
            <label htmlFor="formInputControl3" className="text-sm">
              Username
            </label>
            <input  
              type="text"
              id="formInputControl3"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="username"
              value={username}
              readOnly={!isReadOnly}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>
          {err.username && <span className='text-sm text-red-600'>{err.username}</span>}
          <div className="mb-1">
            <label htmlFor="formInputControl4" className="text-sm">
              Email
            </label>
            <input  
              type="text"
              id="formInputControl4"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="email"
              value={email}
              readOnly={!isReadOnly}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          {err.email && <span className='text-sm text-red-600'>{err.email}</span>}
          {/* {err.password && <span className='text-sm text-red-600'>{err.password}</span>} */}
          {/* <div className="flex justify-end mb-4">
            <a
              href="#"
              className="text-cyan-600 hover:text-cyan-700 text-sm ml-44"
            >
              Forgot password?
            </a>
          </div>
           */}
            <div className='mt-8 flex justify-center gap-3'>
            <div onClick={()=>setIsReadOnly(!isReadOnly)} className="bg-custom-blue text-center w-16  text-white py-2 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out">
              Edit
            </div>
            <button
              className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md w-24  hover:bg-gray-700 transition duration-150 ease-out"
              onClick={(e)=>handleInfoUpdate(e)}
            >
              Update
            </button>
            </div>
        </form>
      </div>
    </div>
{/* ------------------------------------ */}
            </div>
        </div>
        
    </div>
  )
}

export default Profile