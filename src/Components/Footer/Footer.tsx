import React from 'react' 
import './Footer.css'
function Footer() {
  return (
    <div className='mt-10 h-72 md:h-56 bg-custom-blue '>
    <div className='text-center block justify-center pt-8'>
          <span className='textStyle'>Follow us on:</span>
      <div className='space-x-4 mt-3'>
        <i className="fa-brands fa-twitter iconStyle"></i>
        <i className="fa-brands fa-facebook-f iconStyle"></i>
        <i className="fa-brands fa-instagram iconStyle"></i>
        <i className="fa-brands fa-youtube iconStyle"></i>  
      </div>
    </div>
    <div className='mt-5 grid grid-cols-1 place-items-center md:flex justify-center space-x-8'>
        <span className='textStyle'>About</span>
        <span className='textStyle'>Our Services</span>
        <span className='textStyle'>Privacy Policy</span>
        <span className='textStyle'>Terms & Conditions</span>
        <span className='textStyle'>Contact Us</span>
    </div>
    <div className='flex justify-center w-auto  mx-16 md:mx-60 mt-5'>
    <hr className="border-1 border-neon-green px-10 w-full"/>
    </div>
    <div>
     <h1 className="mt-4 pb-3 textStyle text-center">©Copyright 2023 Skillverse | Designed By Nandana</h1>
    </div>
  </div>
  
  
  )
}

export default Footer