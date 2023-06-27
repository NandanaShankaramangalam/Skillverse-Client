import React from 'react'
import { useState, useEffect } from 'react'
import { api } from '../../../services/axios'

 interface tutData{
        fname:string,
        lname:string,
        username:string,
        email:string
        _id:string
        status:boolean
    }

function TutorManagement() {
   const [data, setData] = useState<tutData[]>([]);
   
   useEffect(() => { 
    fetchData();
  }, []);

   const fetchData = async() => {
       try{
         const response = await api.get('/admin/tutor-data');
         console.log('tut data res= ',response.data);
         setData(response.data.tutorData)
         console.log('lll',data);
       }
       catch(err){
        console.error(err);
       }
    }

    const handleBlock = async(e: React.MouseEvent<HTMLButtonElement>,id:string) =>{
        e.preventDefault();
        try{
            const response = await api.post('/admin/block-tutor',{id}, { withCredentials: true })
            console.log('rspnse',response.data);
            fetchData();
            
        }catch(err){
            console.log(err);
            
        }
        console.log('iddd',id);
        
    }

    const handleUnblock = async(e: React.MouseEvent<HTMLButtonElement>,id:string) =>{
        e.preventDefault();
        try{
            const response = await api.post('/admin/unblock-tutor',{id},{ withCredentials: true });
            console.log(response);  
            fetchData();  
        } catch(err){
            console.log(err);
            
        }
         
    }
  return (
<div className='mt-11'>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-xl font-semibold  text-gray-900 bg-white dark:text-white dark:bg-gray-800 text-center">
            Tutor Management
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Sl.No
                </th>
                <th scope="col" className="px-6 py-3">
                    Tutor Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Actions</span>
                </th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((item,index)=>(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                </th>
                <td className="px-6 py-4">
                   {item.fname+' '+item.lname}
                </td>
                <td className="px-6 py-4">
                   {item.username}
                </td>
                <td className="px-6 py-4">
                   {item.email}
                </td>
                <td className="px-6 py-4 text-right">
                    {
                       item.status?
                       <button className='rounded-full border px-5 py-2 border-green-600 bg-green-600 text-white mr-2' onClick={(e)=>handleBlock(e,item._id)}>Block</button>
                       :
                       <button className='rounded-full border px-3 py-2 border-red-600 bg-red-600 text-white mr-2' onClick={(e)=>handleUnblock(e,item._id)}>Unblock</button>
                    }
                
                {/* <button className='rounded-full border px-3 py-2 border-red-600 bg-red-600 text-white'>Unblock</button> */}
                </td>
            </tr>
               )) 
            }
        </tbody>
    </table>
</div>
</div> 
  )
}

export default TutorManagement