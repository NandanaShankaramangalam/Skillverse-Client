import React,{useState} from 'react'
import { api } from '../../../services/axios';
import { useLocation, useNavigate } from 'react-router-dom';

function ResetPasswords() {
    const location = useLocation();
    const navigate = useNavigate();
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [err,setErr] = useState({pwd:'',cpwd:''});
    const email = location.state;
    console.log('emm=',email);
    
    const handlePasswordReset = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        const passwordRegex : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if((password.trim().length === 0)){
            setErr({...err,pwd:'Password field cannot be empty!'})
        }
        else if(!passwordRegex.test(password)){
            setErr({...err,pwd:'Enter a valid password'})
        }
        else if(password == cpassword){
            setErr({...err,pwd:''});
            const result = await api.post(`/reset-password`,{password,email},{withCredentials:true});
            console.log('resss=',result.data);  
            if(result.data){
                navigate('/login');
            }
            
        }else{
            setErr({...err,pwd:'',cpwd:'Password and confirm password doesnot match!'});
        }
    }
  return (
    <div className=" w-full">
      <div className="flex justify-center mt-16 mb-6">
        <h1 className="font-extrabold text-3xl">Reset Password</h1>
      </div>
      <div className="max-w-md flex items-center justify-center  border border-gray-300 rounded-md bg-white mx-4 sm:mx-auto ">
        <form action="" className=" w-full p-6">
          <div className="mb-3 mt-5">
            <label htmlFor="formInputControl1" className="text-sm ">
             Password*
            </label>
            <div className='flex'>
            <input
              type="password"
              id="formInputControl1"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            </div>
          </div>
          <span className='text-sm text-red-600'>{err.pwd}</span>
          
          {/* {err.username && <span className='text-sm text-red-600'>{err.username}</span>} */}
          <div className="mb-1">
            <label htmlFor="formInputControl2" className="text-sm">
              Confirm Password*
            </label>
            <input  
              type="password"
              id="formInputControl2"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="cpassword"
              onChange={(e)=>setCpassword(e.target.value)}
            />
          </div>
          <span className='text-sm text-red-600'>{err.cpwd}</span>
          {/* <div className={`flex justify-center  ${err.invalid? 'mb-2':'mb-5'}`}> */}
          <div className={`flex justify-center pt-4`}>
            <button onClick={handlePasswordReset} className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md w-full hover:bg-gray-700 transition duration-150 ease-out" >
              Submit
            </button>
          </div>
          
          {/* {err.invalid && <p className="text-red-600 text-sm mb-1">{err.invalid}</p>} */}
        </form>
      </div>
    </div>
  )
}

export default ResetPasswords