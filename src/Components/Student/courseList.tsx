import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { api } from '../../services/axios';

interface CategoryData{
    category : string;
    subcategory : [string];
    _id: string;
    status:boolean;
  }
  interface Courses{
    _id : string;
    title : string;
    fee : number;
    category : string;
    subcategory : string[];
    description : string;
    thumbnail : string;
    video : string;
    tutId : string;
    status ?: boolean;
    students ?: [string];
    videoUrl?:string;
    thumbnailUrl?:string;
  }
function CourseList() {
    const{selectedCategory} = useSelector((state:any)=>state.student)
    const [catData,setCatData] = useState<CategoryData[]>([]);
    const [courses, setCourses] = useState<Courses[]>([]);
    useEffect(()=>{
        fetchCatData(); 
        fetchCourseData();
    },[])


    const fetchCatData = async() => {
        try{
          const response = await api.get('/show-category/');
          console.log('cate data res tut= ',response.data);
          // setData(response.data.cateData)
          setCatData(response.data.newArray)
          console.log('catdataaa=',catData);
          
          // console.log('cat data',response.data.newArray[0].category);
        }
        catch(err){
         console.error(err);
        }
     }

     const fetchCourseData = async() => {
        try{
            const response = await api.get(`/show-courses/${selectedCategory}`)
            console.log('cos res=',response.data);
            setCourses(response.data.filteredCourses);
        }catch(err){
            console.error(err);
           }
     }
  return (
    // <div>courseList:{selectedCategory}</div>
    <div>
        <div className="grid grid-cols-7 gap-4 ">
             <div className="md:col-span-2 col-span-7 bg-gray-100 pt-12">
                <h1 className='text-center'>{selectedCategory}</h1>
             </div>

             <div className="md:col-span-5 col-span-7 bg-orange-300 pt-10"> 
                <h1 className='font-medium text-xl'> Courses</h1>
                {courses.map(course => {
        return(
            <div key={course._id} className="course-card">
          <video controls>
            <source type="video/mp4" src={course.videoUrl}/>
          </video>
          <img src={course.thumbnailUrl} alt={course.title} />
          <img src="https://skillverse-bucket.s3.ap-south-1.amazonaws.com/images/draw.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAWU6TXFWYX2XGDPWG%2F20230711%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230711T061523Z&X-Amz-Expires=900&X-Amz-Signature=7eccb0a542ff2eb0b1b094e11125aa80915507082251a0423da9ff7902b58730&X-Amz-SignedHeaders=host" alt={course.title} />
          <h2>{course.title}</h2>
        </div>
        )
})}
             </div>
        </div>
    </div>
  )
}

export default CourseList