import React from 'react'
import CourseTutorial from '../../Components/Tutor/CourseTutorials/CourseTutorials'
import Navbar from '../../Components/Tutor/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function CourseTutorials() {
  return (
    <div>
        <Navbar/>
        <CourseTutorial/>
        <Footer/>
    </div>
  )
}

export default CourseTutorials