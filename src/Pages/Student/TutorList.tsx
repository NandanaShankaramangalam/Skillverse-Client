import React from 'react'
import TutorsList from '../../Components/Student/TutorsList/TutorsList'
import Navbar from '../../Components/Student/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'

function TutorList() {
  return (
    <div>
        <Navbar/>
        <TutorsList/>
        <Footer/>
    </div>
  )
}

export default TutorList