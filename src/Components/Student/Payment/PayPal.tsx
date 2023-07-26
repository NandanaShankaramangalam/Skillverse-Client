import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../services/axios';
import { useSelector } from 'react-redux';

declare global {
    interface Window {
      paypal: any;
    }
  }
function PayPal() {
    const paypal = useRef(null);
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const studentSlice = useSelector((state:any)=>state.student);
    const courseId = studentSlice.selectedCourseId;
    const studId = studentSlice.studId;
    useEffect(()=>{
        console.log("hiii=",state.title);
        console.log('kk=',state);
        
        
      window.paypal.Buttons({
        createOrder : (data:any,actions:any,err:any) => {
            return actions.order.create({
              intent : "CAPTURE",
              purchase_units : [
                {
                    description : "iMovie Course",
                    amount : {
                        currency_code : "USD",
                        value : state.fee
                    }
                }
              ]
            })
        },
        onApprove : async (data:any,actions:any) =>{
           const order = await actions.order.capture();
           console.log(order,"hey"); 
           if(order.status === 'COMPLETED')  {
             const result = await api.post('/payment',{status:true,courseId,studId},{ withCredentials: true })
             console.log('result');
             navigate(`/course/${courseId}`);
           } 
        },
        onError : (err:any) => {
            console.log("err=",err);
            
        }
      }).render(paypal.current)
    },[])
  return (
    <div className='flex justify-center mt-40'>
      <div ref={paypal}></div>
    </div>
    
  )
}

export default PayPal