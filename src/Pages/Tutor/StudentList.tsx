import React from 'react'
import Footer from '../../Components/Footer/Footer'
import StudentsList from '../../Components/Tutor/StudentList/StudentList'
import Navbar from '../../Components/Tutor/Navbar/Navbar'

function StudentList() {
  return (
    <div>
        <Navbar/>
        <StudentsList/>
        <Footer/>
    </div>
  )
}

export default StudentList