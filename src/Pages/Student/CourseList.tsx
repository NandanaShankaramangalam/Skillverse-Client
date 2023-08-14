import React from 'react'
import CourseList from '../../Components/Student/CourseList/courseList'
import Navbar from '../../Components/Student/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function CourseLists() {
  return (
    <div>
        <Navbar/>
        <CourseList/>
        <Footer/>
    </div>
  )
}

export default CourseLists