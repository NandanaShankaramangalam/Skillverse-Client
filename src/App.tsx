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

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={LoginForm} />
          <Route path="/registration" Component={RegistrationForm} />
          <Route path='/admin/login' Component={AdminLoginForm}/>
          <Route path='/tutor/login' Component={TutorLoginForm}/>
          <Route path='/tutor/home' Component={TutorHome}/>
          <Route path="/admin/dashboard" Component={AdminDashboard}/>
          <Route path="/admin/student-management" Component={StudentManagement}/>
          <Route path="/admin/tutor-management" Component={TutorManagement}/>
          <Route path="/admin/category-management" Component={CategoryManagement}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
