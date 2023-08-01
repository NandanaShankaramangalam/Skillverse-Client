import React, { useState } from 'react'
import { tutorAuth } from '../../domain/models/tutor'
import { tutorValidate } from './tutorValidate';
import { api } from '../../services/axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
function TutorForm() {
  const navigate = useNavigate();
  const [tutor,setTutor] = useState<tutorAuth>({fname:'',lname:'',username:'',email:'',password:'',confirm_password:''});
  const [errors,setErrors] = useState({fname:'',lname:'',username:'',email:'',password:'',cpassword:''});

  const addTutor = ((e: React.ChangeEvent<HTMLInputElement>)=>{
    setTutor({...tutor,[e.target.name]:e.target.value});
    tutorValidate(e.target.name, e.target.value, errors,setErrors,tutor.password)
  })

  const handleSignup =  async(e:React.FormEvent) =>{
    e.preventDefault();
    try{
      const {fname,lname,username,email,password,confirm_password} = tutor;
      if(fname!=='' && lname!=='' && username!=='' && email!=='' && password!=='' && confirm_password!==''){
        const {fname,lname,username,email,password,cpassword} = errors
        if(fname === '' && lname === '' && username === '' &&email === '' && password === '' && cpassword  === ''){

      const {data} = await api.post('/tutor/tutor-register',{...tutor},{withCredentials:true})
      console.log('data',data);

      if(data.tutor){
        navigate('/tutor/login');
        console.log('okkk'); 
      }
      else{
        navigate('/registration');
        console.log("not okk"); 
      }  
    } 
    }
  }
    catch(err){
       console.log(err);   
    }
  }
  return (
    <div className="max-w-lg mb-7 flex items-center justify-center  border border-gray-300 rounded-md bg-white mx-4 sm:mx-auto ">
    <form action="" className=" w-full p-6" onSubmit={handleSignup}>
      <div className="block md:flex md:space-x-4">
        <div className="mb-3">
          <label htmlFor="formInputControl1" className="text-sm">
            Tutor Name*
          </label>
          <input
            type="text"
            id="formInputControl1"
            name="fname"
            className="inputStyle"
            onChange={addTutor}
            required
          />
          <p className="text-red-600 text-sm">{errors.fname}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="formInputControl2" className="text-sm">
            Last Name*
          </label>
          <input
            type="text"
            id="formInputControl2"
            name="lname"
             className="inputStyle"
             onChange={addTutor}
             required
          />
          <p className="text-red-600 text-sm">{errors.lname}</p>
        </div>
      </div>

      <div className="block md:flex md:space-x-4 mb-3 w-full">
      <div className="md:w-1/2 mb-3">
          <label htmlFor="formInputControl3" className="text-sm">
          Username*
          </label>
          <input
            type="text"
            id="formInputControl3"
            name="username"
             className="inputStyle"
             required
             onChange={addTutor}
          />
          <p className="text-red-600 text-sm">{errors.username}</p>
        </div>
        <div className="md:w-1/2 mb-3">
          <label htmlFor="formInputControl4" className="text-sm">
           Email*
          </label>
          <input
            type="email"
            id="formInputControl4"
            name="email"
             className="inputStyle"
             required
             onChange={addTutor}
          />
          <p className="text-red-600 text-sm">{errors.email}</p>
        </div>
      </div>

      <div className="block md:flex md:space-x-4 mb-3 w-full">
      <div className="md:w-1/2 mb-3">
          <label htmlFor="formInputControl5" className="text-sm">
          Password*
          </label>
          <input
            type="password"
            id="formInputControl5"
            name="password"
            className="inputStyle"  
            required
            onChange={addTutor}
          />  
          <p className="text-red-600 text-sm">{errors.password}</p>
        </div>
        <div className="md:w-1/2 mb-3">
          <label htmlFor="formInputControl6" className="text-sm">
           Confirm Password*
          </label>
          <input
            type="password"
            id="formInputControl6"
            name="confirm_password"
            className="inputStyle"
            required
            onChange={addTutor}
          />
          <p className="text-red-600 text-sm">{errors.cpassword}</p>
        </div>
      </div>
      <div className="block justify-center mb-4  mt-7 md:mt-4">
          <button className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md w-full hover:bg-gray-700 transition duration-150 ease-out" 
         >
            Sign Up
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex-grow">
            <hr className="border-gray-300" />
          </div>
          <span className="mx-2 text-sm">or</span>
          <div className="flex-grow">
            <hr className="border-gray-300" />
          </div>
        </div>

        <div className="mt-3 text-center mb-3">
          <p className="text-sm">
            Already have an account?
            <button>
              <span className="ml-1 text-cyan-600 hover:text-cyan-700">
                Login here
              </span>
            </button>
          </p>
        </div>
        {/* <div className="flex justify-center">
          <button className="px-4 py-2 border flex gap-2 border-slate-200 rounded-md text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
            <img
              className="w-4 h-5"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="text-sm">Sign up with Google</span>
          </button>
        </div> */}
        <div className="flex justify-center">
        <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
    </form>
  </div>
  )
}

export default TutorForm