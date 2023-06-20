import React, { ChangeEventHandler, FormEvent, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { api } from "../../services/axios";
interface LoginProps {
   userType : string
}
type StudentLogin = {
   email : string,
   password : string
}
function Login(props:LoginProps) {
  const navigate = useNavigate();
  const [student,setStudent] = useState<StudentLogin>({email: '', password: ''});

  const addStudent  = ((e:React.ChangeEvent<HTMLInputElement>)=>{
    setStudent({...student,[e.target.name]:e.target.value})
  })
  
  const handleLogin = async(e:React.FormEvent)=>{
    e.preventDefault();
    const {data} = await api.post('/student-login',{...student}, { withCredentials: true });
    console.log('data=',data);
    // if(data.student){
    //   navigate('/login');
    // }
    // else{
    //   navigate('/registration');
    // }
    console.log('ss=',student);
    
  }
  // if(props.userType == 'student'){
    
  // }
 
  return (
    <div className=" w-full">
      <div className="flex justify-center mt-16 mb-6">
        <h1 className="font-extrabold text-3xl">Sign In to Skillverse</h1>
      </div>
      <div className="max-w-md flex items-center justify-center  border border-gray-300 rounded-md bg-white mx-4 sm:mx-auto ">
        <form action="" className=" w-full p-6">
          <div className="mb-3 mt-5">
            <label htmlFor="formInputControl1" className="text-sm ">
              Email*
            </label>
            <input
              type="text"
              id="formInputControl1"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="email"
              onChange={addStudent}
            />
          </div>
          <div className="mb-1">
            <label htmlFor="formInputControl2" className="text-sm">
              Password*
            </label>
            <input
              type="password"
              id="formInputControl2"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="password"
              onChange={addStudent}
            />
          </div>
          <div className="flex justify-end mb-4">
            <a
              href="#"
              className="text-cyan-600 hover:text-cyan-700 text-sm ml-44"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex justify-center mb-5">
            <button className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md w-full hover:bg-gray-700 transition duration-150 ease-out" onClick={handleLogin}>
              Sign in
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
              Not a member?
              <button>
                <span className="ml-1 text-cyan-600 hover:text-cyan-700">
                  Register
                </span>
              </button>
            </p>
          </div>
          <div className="flex justify-center">
            <button className="px-4 py-2 border flex gap-2 border-slate-200 rounded-md text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
              <img
                className="w-4 h-5"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span className="text-sm">Login with Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
