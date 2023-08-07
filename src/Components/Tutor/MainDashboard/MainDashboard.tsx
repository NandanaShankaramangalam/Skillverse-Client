import { faBook, faGraduationCap, faPersonChalkboard, faUserLargeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { api } from '../../../services/axios';
import { Doughnut, Bar } from 'react-chartjs-2';
import {Chart, ArcElement,  Tooltip, BarElement, CategoryScale, LinearScale} from 'chart.js'
Chart.register(ArcElement, Tooltip, BarElement, CategoryScale, LinearScale);

function MainDashBoard() {
    const [courseDetails,setCourseDetails] = useState([{_id:'',title:'',fee:'',category:'',thumbnail:'',video:'',tutId:'',description:'',students:'',stud:[{id:'',date:''}],tutorial:[{title:'',video:'',description:''}]}])
    const tutorSlice = useSelector((state:any)=>state.tutor);
    const tutId = tutorSlice.tutId;
    const [graphData,setGraphData] = useState([{_id:'',total:0}]);
    useEffect(()=>{
      fetchData();
      
     },[])
    const fetchData = async() =>{
      console.log('tutt=',tutId);
      
      const res = await api.get(`/tutor/dashboard-details/${tutId}`);
      console.log('res==',res.data.dashData);
      console.log('grphhh-=',res.data.graphData);
      setCourseDetails(res.data.dashData);
      setGraphData(res.data.graphData);
      graphData.map((obj)=>{console.log('hjbjbj',obj._id);
      })
    }
    
    const BarData = {
      labels: [...graphData.map(obj=>obj._id)],
      datasets: [
          {
              label: 'Revenue',
              data: [...graphData.map(obj=>obj.total)],
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
          },
      ],
  };
  const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};
    // Function to get month and year from the 'time' field
    // function getMonthYear(time:string) {
    //   const date = new Date(time);
    //   const year = date.getFullYear();
    //   const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    //   return month;
    // }

     // Calculate month-wise total price
    //  const monthWiseTotalPrice:any = {};
    //  courseDetails.forEach((item) => {
    //   item.stud.map((obj)=>{
    //     const monthYear = getMonthYear(obj.date);
    //     if (!monthWiseTotalPrice[monthYear]) {
    //       monthWiseTotalPrice[monthYear] = 0;
    //     }
    //     console.log('kkk=',monthWiseTotalPrice[monthYear]);
        
    //     monthWiseTotalPrice[monthYear] += item.fee;
    //   })   
    //  });
  return (
    <div>
    <div>
      <div className='flex space-x-11 py-10 px-24'>
    
          {/* <div className='flex justify-between h-28 w-64 pe-4 hover:shadow-md rounded-md border border-gray-200'>
            <div className='ms-4 gap-2'>
                <div className='pt-3 pb-2'>
                  <h1 className='text-gray-400'>Tutors</h1>
                </div>
                <div className='ps-3'>
                  <h1 className='text-2xl font-semibold'></h1>   
                </div>      
                </div>
            <div className='h-20 w-20 bg-slate-100 mt-4 rounded-md text-center pt-6'><FontAwesomeIcon icon={faPersonChalkboard} className='text-4xl text-custom-blue'/></div>
          </div> */}

          {/* <div className='flex justify-between h-28 w-64 pe-4 hover:shadow-md rounded-md border border-gray-200'>
            <div className='ms-4 gap-2'>
                <div className='pt-3 pb-2'>
                  <h1 className='text-gray-400'>Students</h1>
                </div>
                <div className='ps-3'>
                  <h1 className='text-2xl font-semibold'></h1>   
                </div>      
                </div>
            <div className='h-20 w-20 bg-slate-100 mt-4 rounded-md text-center pt-6'><FontAwesomeIcon icon={faGraduationCap} className='text-4xl text-custom-blue'/></div>
          </div> */}

          {/* <div className='flex justify-between h-28 w-64 pe-4 hover:shadow-md rounded-md border border-gray-200'>
            <div className='ms-4 gap-2'>
                <div className='pt-3 pb-2'>
                  <h1 className='text-gray-400'>Categories</h1>
                </div>
                <div className='ps-3'>
                  <h1 className='text-2xl font-semibold'></h1>   
                </div>      
                </div>
            <div className='h-20 w-20 bg-slate-100 mt-4 rounded-md text-center pt-6'><FontAwesomeIcon icon={faBook} className='text-4xl text-custom-blue'/></div>
          </div> */}

          {/* <div className='flex justify-between h-28 w-64 pe-4 hover:shadow-md rounded-md border border-gray-200'>
            <div className='ms-4 gap-2'>
                <div className='pt-3 pb-2'>
                  <h1 className='text-gray-400'>Blocked Tutors</h1>
                </div>
                <div className='ps-3'>
                  <h1 className='text-2xl font-semibold'></h1>   
                </div>      
                </div>
            <div className='h-20 w-20 bg-slate-100 mt-4 rounded-md text-center pt-6'><FontAwesomeIcon icon={faUserLargeSlash} className='text-4xl text-custom-blue'/></div>
          </div> */}

      </div>

      <div className='w-full px-24 flex space-x-4'>
      <div className='h-96 w-3/5 hover:shadow-md bg-slate-100 p-10 pt-3'>
        <div className='pb-4'>
          <h1 className='text-gray-400'>Revenue per month(in $)</h1>
        </div>
      <Bar data={BarData}  options={options}/>
      </div>
      <div className='h-96 w-2/5 hover:shadow-md bg-slate-100 p-10 pt-1'>
        <div className='pt-2'><h1 className='text-gray-400'>Categories & No.of Courses</h1></div>
        <div className='flex justify-center p-10 pt-6'>
          <h1>jbnjjjbjb</h1>
        </div>
      </div>
      </div>

      <div className='w-full px-24 py-10'>      
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Sl.No
                </th>
                <th scope="col" className="px-6 py-3">
                    Course
                </th>
                <th scope="col" className="px-6 py-3">
                    No.of students
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
                {/* <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th> */}
            </tr>
        </thead>
        <tbody>
          {
           courseDetails.map((obj,index)=>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                </th>
                <td className="px-6 py-4">
                    {obj.title}
                </td>
                <td className="px-6 py-4">
                    {obj.students.length-1}
                </td>
                <td className="px-6 py-4">
                    ${((obj.students.length)-1) * parseInt(obj.fee)}
                </td>
                </tr>
           )
          }
            
            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="px-6 py-4">
                    White
                </td>
                <td className="px-6 py-4">
                    Laptop PC
                </td>
                <td className="px-6 py-4">
                    $1999
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr> */}
            {/* <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="px-6 py-4">
                    Black
                </td>
                <td className="px-6 py-4">
                    Accessories
                </td>
                <td className="px-6 py-4">
                    $99
                </td>
                <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr> */}
        </tbody>
    </table>
</div>
</div> 
    </div>
  </div>
  )
}

export default MainDashBoard