import React, {useEffect, useState,} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { api, apiAuth } from "../../../services/axios";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { studentLogged } from "../../../redux/student/studentSlice";
import {CredentialResponse, GoogleLogin} from '@react-oauth/google';
import Swal from 'sweetalert2';
interface LoginProps {
  userType: string;
}
type StudentLogin = {
  email: string;
  password: string;
};
interface ErrState {
  invalid?: string;
  password?: string;
  email?: string;
  block?:string
}
function Login(props: LoginProps) {
  console.log("prop=", props.userType);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [student, setStudent] = useState<StudentLogin>({
    email: "",
    password: "",
  });
 
  const [err, setErr] = useState<ErrState>({});

  const addStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  

  useEffect(()=>{
    const stud = localStorage.getItem('student');
    console.log('stuuuddd=',stud);
    if(stud){
       const token = JSON.parse(stud)
       console.log('token=',token);
       const decodedToken: any = jwtDecode(token.token);
       console.log('dec ',decodedToken);
       const expirationTime = decodedToken.exp;
       console.log('tokdat=',token?.token);

       if(token?.token){
          if(expirationTime && expirationTime < Date.now() / 1000){
                  // Token has expired, perform necessary actions (e.g., refresh token, log out)
                  navigate('/login');
                  console.log('expired');

                }
                else{
                  navigate('/');
                  console.log('home');
                }
       }else{
        navigate('/login');
       }

    } else{
      navigate('/login');
      console.log('expirddd');

    }

  },[])
  //Handle Student Login
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (student.email.trim() === '') {
      setErr((prevState) => ({ ...prevState, email: 'Email cannot be empty' }));
    }
    else  if (student.password.trim() === '') {
          setErr((prevState) => ({ ...prevState, email: '' }));
          setErr((prevState) => ({ ...prevState, password: 'Password cannot be empty' }));
      }
     else {
          const {data} = await apiAuth.post('/student-login',{...student}, { withCredentials: true });
          if(data.student){
             console.log('stud data=',data);
             handleAlert();
          }
         
          setErr((prevState) => ({ ...prevState, block: data.block }));
          if(data.student?.username && data.student?.email){
            dispatch(studentLogged({studUsername:data.student.username,studEmail:data.student.email,studId:data.student._id}))
          }
         
  if(data.student){ 
    console.log('aaa');
    
      localStorage.setItem('student',JSON.stringify(data))
      navigate('/');
  }
  if(data.invalid){    
   setErr({...err,invalid:data.invalid,password:''})
      return
  }
        
    }
  };

  const gLogin=async(res:any)=>{
    const result:any=jwtDecode(res.credential as string)
    const email=result.email
    const password='123Google@@'
    const student = {
      email,
      password
    }
    console.log('std=',student);
    
    const {data}=await api.post('/student-login',{email,password},{withCredentials:true})
    if(data){
      console.log('dddd=',data);
      handleAlert();
    }
    if(data.student?.username && data.student?.email){
      dispatch(studentLogged({studUsername:data.student.username,studEmail:data.student.email,studId:data.student._id}))
    }
    if(data.student){ 
      console.log('aaa');
      
        localStorage.setItem('student',JSON.stringify(data))
        navigate('/');
    }
  }
 

  const handleAlert = ()=>{
    Swal.fire({
      position: 'center', // This will center the alert on the screen
      icon: 'success',
      title: 'Login Successful',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'center-alert', // Apply the custom CSS class
      },
    });
    
  }

  return (
    <div className=" w-full">
      <div className="flex justify-center mt-16 mb-6">
        <h1 className="font-extrabold text-3xl">Sign In as Student</h1>
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
          {err.email && <span className='text-sm text-red-600'>{err.email}</span>}
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
          {err.password && <span className='text-sm text-red-600'>{err.password}</span>}
          <div className="flex justify-end mb-4">
            <NavLink to={'/forgot-password'}
              
              className="text-cyan-600 hover:text-cyan-700 text-sm ml-44"
            >
              Forgot password?
            </NavLink>
          </div>

          <div
            className={`flex justify-center  ${err.invalid ? "mb-2" : err.block ? "mb-2" : "mb-5"}`}
          >
            <button
              className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md w-full hover:bg-gray-700 transition duration-150 ease-out"
              onClick={(e)=>{handleStudentLogin(e);}}
            >
              Sign in
            </button>
          </div>
          {err.invalid && (
            <p className="text-red-600 text-sm mb-1">{err.invalid}</p>
          )}
          {err.block && (
            <p className="text-red-600 text-sm mb-1">{err.block}</p>
          )}
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
              <button onClick={()=>navigate('/registration')}>
                <span className="ml-1 text-cyan-600 hover:text-cyan-700">
                  Register
                </span>
              </button>
            </p>
          </div>
         
          <div className="flex justify-center">
          <GoogleLogin size='medium'  onSuccess={credentialResponse => {gLogin(credentialResponse);}} onError={() => { console.log('Login Failed'); }}/>
          </div>
          {props.userType == "student" ? (
            <div className="text-center mt-3 mb-2">
              <p className="text-sm">
                Login as
                <button onClick={() => navigate("/tutor/login")}>
                  <span className="ml-1 text-cyan-600 hover:text-cyan-700">
                    Tutor
                  </span>
                </button>
              </p>
            </div>
          ) : (
            <div className="text-center mt-3 mb-2">
              <p className="text-sm">
                Login as
                <button 
                onClick={() => navigate("/login")}
                >
                  <span className="ml-1 text-cyan-600 hover:text-cyan-700">
                    Student
                  </span>
                </button>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
