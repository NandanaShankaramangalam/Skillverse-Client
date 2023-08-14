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
import Purchased from "./Pages/Student/Purchased";
import ForgotPassword from "./Pages/Student/ForgotPassword";
import ResetPassword from "./Pages/Student/ResetPassword";
import Profile from "./Components/Student/StudentProfile/Profile";
import TutorList from "./Pages/Student/TutorList";
import TutorProfile from "./Pages/Student/TutorProfile";
import StudentList from "./Pages/Tutor/StudentList";
import CourseTutorials from "./Pages/Tutor/CourseTutorials";
import MainDashboard from "./Pages/Tutor/MainDashboard";
import ProtectedAdmin from "./Components/protectedAdmin";
import ProtectedStudent from "./Components/protectedStudent";
import ProtectedTutor from "./Components/protectedTutor";
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
          <Route path="/purchased-courses" element={<Purchased></Purchased>}/>
          <Route path="/admin/login" Component={AdminLoginForm} />
          {/* <Route path="/admin/dashboard" Component={AdminDashboard} /> */}
          <Route
            path="/admin/student-management"
            Component={StudentManagement}
          />
          <Route path="/admin/tutor-management" Component={TutorManagement} />
          <Route
            path="/admin/category-management"
            Component={CategoryManagement}
          />
          <Route path="/admin/dashboard" element={<ProtectedAdmin><AdminDashboard/></ProtectedAdmin>}/>


          <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}/>
          <Route path="/reset-password" element={<ResetPassword></ResetPassword>}/>
          {/* <Route path="/personal-info" element={<StudentProfile></StudentProfile>}/> */}
          <Route path="/personal-info" element={<ProtectedStudent><Profile/></ProtectedStudent>}/>
          <Route path="/tutors" element={<TutorList></TutorList>}/>
          <Route path="/view-tutor-profile" element={<TutorProfile></TutorProfile>}/>
         
 
          <Route path="/tutor/login" Component={TutorLoginForm} />
          <Route path="/tutor/home" Component={TutorHome} />
          <Route path="/tutor/dashboard" Component={TutorDashboard} />
          <Route path={`/tutor/profile`} Component={ViewProfile} element={<ViewProfile/>}/>
          <Route path="/tutor/courses" element={<ProtectedTutor><Courses/></ProtectedTutor>}/>
          <Route path='/tutor/students' element={<ProtectedTutor><StudentList/></ProtectedTutor>}/>
          <Route path={`/tutor/course/${courseId}`} element={<TutorCourseDetails/>}/>
          <Route path={`/course-tutorials/:courseId`} element={<CourseTutorials></CourseTutorials>}/>
          <Route path={`/tutor/tutor-dashboard`} element={<ProtectedTutor><MainDashboard/></ProtectedTutor>}/>
          {/* <Route path='/tutor/video-upload' Component={VideoUpload}/> */}

          <Route path="/chat" element={<Chats role={'student'}></Chats>}/>
          <Route path="/tutor/chat" element={<Chats role={'tutor'}></Chats>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
