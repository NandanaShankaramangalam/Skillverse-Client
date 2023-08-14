import { Navigate, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { GiTeacher } from 'react-icons/gi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGraduationCap, faPersonChalkboard, faUserLargeSlash } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../../services/axios';
import { Pie , Bar} from 'react-chartjs-2';
import {Chart, ArcElement,  Tooltip , BarElement, CategoryScale, LinearScale} from 'chart.js'
Chart.register(ArcElement, Tooltip, BarElement, CategoryScale, LinearScale);
interface Cate{
    _id:string,
    count:number,
}

interface BarDatas{
    _id:string,
    total:number,
}
function Dashboard() {
  const navigate = useNavigate();
  const{admUsername} = useSelector((state:any)=>state.admin);
  const [pieChart,setPieChart] = useState<Cate[]>([]);
  const [studCount,setStudCount] = useState(0);
  const [tutCount,setTutCount] = useState(0);
  const [catCount,setCatCount] = useState(0);
  const [tutBlockCount,setTutBlockCount] = useState(0);
  const [barData,setBarData] = useState<BarDatas[]>([]);
    useEffect(()=>{
      // if(!admUsername){
      //   navigate('/admin/login');
      // }
      
      const fetchPieChartData = async() =>{
        const res = await api.get('/admin/dashboard-details');
        if(res){
            console.log('res====',res.data);
            setStudCount(res.data.studCount);
            setTutCount(res.data.tutCount);
            setCatCount(res.data.catCount);
            setTutBlockCount(res.data.tutBlockCount);
            setPieChart(res.data.pieChartData); 
            setBarData(res.data.barData);
        }
        
    }
      fetchPieChartData();
    },[])
    

    const data = {
        labels: [...pieChart.map((obj)=>obj._id)],
        datasets: [
          {
            data: [...pieChart.map((obj)=>obj.count)],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };

      const options = {
        tooltips: {
          callbacks: {
            label: (tooltipItem:any, data:any) => {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const index = tooltipItem.index;
              const label = dataset.labels[index];
              const count = dataset.data[index];
              return `${label}: ${count} courses`;
            },
          },
        },
      };

      const BarData = {
        labels: [...barData.map(obj=>obj._id)],
        datasets: [
            {
                label: 'Revenue',
                data: [...barData.map(obj=>obj.total)],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };
    const option = {
      scales: {
          y: {
              beginAtZero: true,
          },
      },
  };
    
  return (
    <div>
    <div>
      <div className='flex space-x-11 py-10 px-24'>
    
          <div className='flex justify-between h-28 w-64 pe-4 hover:shadow-md rounded-md border border-gray-200'>
            <div className='ms-4 gap-2'>
                <div className='pt-3 pb-2'>
                  <h1 className='text-gray-400'>Tutors</h1>
                </div>
                <div className='ps-3'>
                  <h1 className='text-2xl font-semibold'>{tutCount}</h1>   
                </div>      
                </div>
            <div className='h-20 w-20 bg-slate-100 mt-4 rounded-md text-center pt-6'><FontAwesomeIcon icon={faPersonChalkboard} className='text-4xl text-custom-blue'/></div>
          </div>

          <div className='flex justify-between h-28 w-64 pe-4 hover:shadow-md rounded-md border border-gray-200'>
            <div className='ms-4 gap-2'>
                <div className='pt-3 pb-2'>
                  <h1 className='text-gray-400'>Students</h1>
                </div>
                <div className='ps-3'>
                  <h1 className='text-2xl font-semibold'>{studCount}</h1>   
                </div>      
                </div>
            <div className='h-20 w-20 bg-slate-100 mt-4 rounded-md text-center pt-6'><FontAwesomeIcon icon={faGraduationCap} className='text-4xl text-custom-blue'/></div>
          </div>

          <div className='flex justify-between h-28 w-64 pe-4 hover:shadow-md rounded-md border border-gray-200'>
            <div className='ms-4 gap-2'>
                <div className='pt-3 pb-2'>
                  <h1 className='text-gray-400'>Categories</h1>
                </div>
                <div className='ps-3'>
                  <h1 className='text-2xl font-semibold'>{catCount}</h1>   
                </div>      
                </div>
            <div className='h-20 w-20 bg-slate-100 mt-4 rounded-md text-center pt-6'><FontAwesomeIcon icon={faBook} className='text-4xl text-custom-blue'/></div>
          </div>

          <div className='flex justify-between h-28 w-64 pe-4 hover:shadow-md rounded-md border border-gray-200'>
            <div className='ms-4 gap-2'>
                <div className='pt-3 pb-2'>
                  <h1 className='text-gray-400'>Blocked Tutors</h1>
                </div>
                <div className='ps-3'>
                  <h1 className='text-2xl font-semibold'>{tutBlockCount}</h1>   
                </div>      
                </div>
            <div className='h-20 w-20 bg-slate-100 mt-4 rounded-md text-center pt-6'><FontAwesomeIcon icon={faUserLargeSlash} className='text-4xl text-custom-blue'/></div>
          </div>

      </div>

      <div className='w-full px-24 flex space-x-4 mb-10'>
      <div className='h-96 w-3/5 hover:shadow-md bg-slate-100 p-10 pt-3'>
        <div className='pb-4'>
          <h1 className='text-gray-400'>Revenue per month(in $)</h1>
        </div>
      <Bar data={BarData}/>
      </div>
      <div className='h-96 w-2/5 hover:shadow-md bg-slate-100 p-10 pt-1'>
        <div className='pt-2'><h1 className='text-gray-400'>Categories & No.of Courses</h1></div>
        <div className='flex justify-center p-10 pt-6'>
          <Pie data={data}  className=''/>
        </div>
      </div>
      </div>

      {/* <div className='w-full px-24 py-10'>     
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" className="px-6 py-3">
                  Product name
              </th>
              <th scope="col" className="px-6 py-3">
                  Color
              </th>
              <th scope="col" className="px-6 py-3">
                  Category
              </th>
              <th scope="col" className="px-6 py-3">
                  Price
              </th>
              <th scope="col" className="px-6 py-3">
                  Action
              </th>
          </tr>
      </thead>
      <tbody>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">
                  Silver
              </td>
              <td className="px-6 py-4">
                  Laptop
              </td>
              <td className="px-6 py-4">
                  $2999
              </td>
              <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
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
              <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
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
              <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
          </tr>
          <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Google Pixel Phone
              </th>
              <td className="px-6 py-4">
                  Gray
              </td>
              <td className="px-6 py-4">
                  Phone
              </td>
              <td className="px-6 py-4">
                  $799
              </td>
              <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
          </tr>
          <tr>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple Watch 5
              </th>
              <td className="px-6 py-4">
                  Red
              </td>
              <td className="px-6 py-4">
                  Wearables
              </td>
              <td className="px-6 py-4">
                  $999
              </td>
              <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
          </tr>
      </tbody>
  </table>
</div>

      </div> */}
    </div>
  </div>
  )
}

export default Dashboard