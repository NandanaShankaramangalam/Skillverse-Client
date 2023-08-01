import React, { Component } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import ViewProfile from "./Components/Tutor/Profile/ViewProfile";
// import CourseList from "./Components/Student/CourseList/courseList";
import StudentProfile from "./Pages/Student/Profile";
import Dashboard from "./Components/Student/Dashboard/Dashboard";
import CourseList from "./Pages/Student/CourseList";
import CourseDetail from "./Pages/Student/CourseDetails";
import Courses from "./Pages/Tutor/Courses";
import TutorCourseDetails from "./Pages/Tutor/CourseDetails";
import PayPal from "./Components/Student/Payment/PayPal";
// import CourseAttend from "./Components/Student/CourseAttend/CourseAttend";
import CoursesAttend from "./Pages/Student/CourseAttend";
// import Chat from "./Components/Chat/Chat";
import Chats from "./Pages/Chat";
// import BookmarkedCourses from "./Components/Student/BookmarkedCourses/BookmarkedCourses";
import Bookmarks from "./Pages/Student/Bookmarks";
// import Profile from "./Components/Student/Profile/Profile";

function App() {
  const { tutId } = useSelector((state: any) => state.tutor);
  const { selectedCategory } = useSelector((state: any) => state.student);
  const { selectedCourseId } = useSelector((state: any) => state.student);
  // const { courseId } = useSelector((state: any) => state.tutor);
  const tutorSlice = useSelector((state: any) => state.tutor);
  const courseId = tutorSlice.courseId;
  console.log('cid app=',courseId);
  
  const category = localStorage.getItem("category");
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={LoginForm} />
          <Route path="/registration" Component={RegistrationForm} />
          <Route
            path={`/course-list/:selectedCategory`}
            Component={CourseList}
          />
          {/* <Route
            path={`/course-list/${selectedCategory}`}
            Component={CourseList}
          /> */}

          <Route path={`/course/${selectedCourseId}`} Component={CourseDetail}/>
          <Route path="/profile" Component={StudentProfile} />
          <Route path="/dashboard" Component={Dashboard} />
          <Route path="/paypal" Component={PayPal} />
          <Route path={`/course-attend/:courseId`} Component={CoursesAttend} />
          <Route path="/bookmarked-courses" element={<Bookmarks></Bookmarks>}/>

          <Route path="/admin/login" Component={AdminLoginForm} />
          <Route path="/admin/dashboard" Component={AdminDashboard} />
          <Route
            path="/admin/student-management"
            Component={StudentManagement}
          />
          <Route path="/admin/tutor-management" Component={TutorManagement} />
          <Route
            path="/admin/category-management"
            Component={CategoryManagement}
          />


          <Route path="/tutor/login" Component={TutorLoginForm} />
          <Route path="/tutor/home" Component={TutorHome} />
          <Route path="/tutor/dashboard" Component={TutorDashboard} />
          <Route path={`/tutor/profile`} Component={ViewProfile} />
          <Route path="/tutor/courses" Component={Courses}/>
          <Route path={`/tutor/course/${courseId}`} Component={TutorCourseDetails}/>
          {/* <Route path='/tutor/video-upload' Component={VideoUpload}/> */}

          <Route path="/chat" element={<Chats role={'student'}></Chats>}/>
          <Route path="/tutor/chat" element={<Chats role={'tutor'}></Chats>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
