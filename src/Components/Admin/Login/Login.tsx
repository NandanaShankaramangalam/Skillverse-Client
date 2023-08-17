import React, { useEffect, useState } from "react";
import { api, apiAuth } from "../../../services/axios";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogged } from "../../../redux/admin/adminSlice";
import Swal from "sweetalert2";
type AdminLogin = {
  username: string;
  password: string;
};
interface ErrState {
  username?: string;
  password?: string;
  invalid?: string;
}
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState<AdminLogin>({
    username: "",
    password: "",
  });
  const [err, setErr] = useState<ErrState>({});

  const addAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const adm = localStorage.getItem("admin");
    console.log("adm=", adm);
    if (adm) {
      console.log("jjj");
      const token = JSON.parse(adm);
      console.log("token=", token);
      const decodedToken: any = jwtDecode(token.token);
      const expirationTime = decodedToken.exp;
      if (token?.token) {
        console.log("kkk", expirationTime);

        if (expirationTime && expirationTime < Date.now() / 1000) {
          console.log("mmm");

          navigate("/admin/login");
        } else {
          navigate("/admin/dashboard");
        }
      } else {
        navigate("/admin/login");
      }
    } else {
      navigate("/admin/login");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (admin.username.trim() === "") {
      setErr((prevState) => ({
        ...prevState,
        username: "Username cannot be empty",
      }));
    } else if (admin.password.trim() === "") {
      setErr((prevState) => ({ ...prevState, username: "" }));
      setErr((prevState) => ({
        ...prevState,
        password: "Password cannot be empty",
      }));
    } else {
      const { data } = await apiAuth.post(
        "/admin/admin-login",
        { ...admin },
        { withCredentials: true }
      );
      console.log("Admin dataaaa=", admin.username);
      if (data.admin?.username) {
        dispatch(adminLogged({ admUsername: data.admin.username }));
      }

      if (data.admin) {
        console.log("aaa");

        localStorage.setItem("admin", JSON.stringify(data));
        navigate("/admin/dashboard");
        handleAlert();
      }
      if (data.invalid) {
        setErr({ ...err, invalid: data.invalid, password: "" });
        return;
      }
    }
  };

  const handleAlert = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Login Successful",
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: "center-alert",
      },
    });
  };
  return (
    <div className=" w-full">
      <div className="flex justify-center mt-16 mb-6">
        <h1 className="font-extrabold text-3xl">Sign In as Admin</h1>
      </div>
      <div className="max-w-md flex items-center justify-center  border border-gray-300 rounded-md bg-white mx-4 sm:mx-auto ">
        <form action="" className=" w-full p-6">
          <div className="mb-3 mt-5">
            <label htmlFor="formInputControl1" className="text-sm ">
              Username*
            </label>
            <input
              type="text"
              id="formInputControl1"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="username"
              onChange={addAdmin}
            />
          </div>
          {err.username && (
            <span className="text-sm text-red-600">{err.username}</span>
          )}
          <div className="mb-1">
            <label htmlFor="formInputControl2" className="text-sm">
              Password*
            </label>
            <input
              type="password"
              id="formInputControl2"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="password"
              onChange={addAdmin}
            />
          </div>

          {err.password && (
            <span className="text-sm text-red-600">{err.password}</span>
          )}

          <div
            className={`flex justify-center mt-4 ${
              err.invalid ? "mb-2" : "mb-5"
            }`}
          >
            <button
              className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md w-full hover:bg-gray-700 transition duration-150 ease-out"
              onClick={(e) => {
                handleLogin(e);
                // handleAlert();
              }}
            >
              Sign in
            </button>
          </div>
          {err.invalid && (
            <p className="text-red-600 text-sm mb-1">{err.invalid}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
