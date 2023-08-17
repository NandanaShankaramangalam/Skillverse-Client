import React from "react";
import { Navigate } from "react-router-dom";
interface AdminProtectedProps {
  children: React.ReactElement;
}

const ProtectedAdmin: React.FC<AdminProtectedProps> = ({ children }) => {
  const Admin = localStorage.getItem("admin");
  console.log(Admin, "protected route");
  if (Admin) {
    return children;
  }
  return Navigate({ to: "/admin/login" });
};

export default ProtectedAdmin;
