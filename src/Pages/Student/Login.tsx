import React from "react";
import Login from "../../Components/Login/Login";
import Footer from "../../Components/Footer/Footer";
function LoginForm() {
  return (
    <div>
      <Login userType="student"/>
      <Footer />
    </div>
  );
}

export default LoginForm;
