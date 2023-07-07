import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginForm from "./Pages/Student/Login";
import RegistrationForm from "./Pages/Registration";
import AdminLoginForm from "./Pages/Admin/Login";
import TutorLoginForm from "./Pages/Tutor/Login";
import AdminDashboard from "./Pages/Admin/Dashboard";
import TutorHome from "./Pages/Tutor/Home";
import StudentManagement from "./Pages/Admin/StudentManagement";
import TutorManagement from "./Pages/Admin/TutorManagement";
import CategoryManagement from "./Pages/Admin/CategoryManagement";
import TutorDashboard from "./Pages/Tutor/Dashboard";
import VideoUpload from "./Components/Tutor/VideoUpload/VideoUpload";
import { useSelector } from 'react-redux';
import ViewProfile from "./Components/Tutor/Profile/ViewProfile";

function App() {
  const { tutId } = useSelector((state: any) => state.tutor);
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={LoginForm} />
          <Route path="/registration" Component={RegistrationForm} />

          <Route path='/admin/login' Component={AdminLoginForm}/>
          <Route path="/admin/dashboard" Component={AdminDashboard}/>
          <Route path="/admin/student-management" Component={StudentManagement}/>
          <Route path="/admin/tutor-management" Component={TutorManagement}/>
          <Route path="/admin/category-management" Component={CategoryManagement}/>

          <Route path='/tutor/login' Component={TutorLoginForm}/>
          <Route path='/tutor/home' Component={TutorHome}/>
          <Route path='/tutor/dashboard' Component={TutorDashboard}/>
          <Route path={`/tutor/profile`} Component={ViewProfile}/>
          {/* <Route path='/tutor/video-upload' Component={VideoUpload}/> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
