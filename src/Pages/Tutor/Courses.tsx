import React from 'react'
import CourseList from '../../Components/Tutor/Courses/CourseList'
import Navbar from '../../Components/Tutor/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function Courses() {
  return (
    <div>
        <Navbar/>
        <CourseList/>
        <Footer/>
    </div>
  )
}

export default Courses