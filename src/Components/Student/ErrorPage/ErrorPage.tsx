import React from 'react'
import './ErrorPage.css'
import { useNavigate } from 'react-router-dom'
function ErrorPage() {
    const navigate = useNavigate();
    const location = window.location.pathname
    const url = location.split('/')[1];
    console.log('url=',url);
    const handleRedirect = () =>{
        if(url==='admin')
        navigate('/admin/dashboard');
        else if(url==='tutor')
        navigate('/tutor/tutor-dashboard');
        else
        navigate('/');
    }
  return (
    <div className='page h-screen'>
      <div className="section">
        <h1 className="error">404</h1>
        <div className="page">Ooops!!! The page you are looking for is not found</div>
        <button className="back-home" onClick={handleRedirect}>Back to home</button>
      </div>  
    </div>

  )
}

export default ErrorPage