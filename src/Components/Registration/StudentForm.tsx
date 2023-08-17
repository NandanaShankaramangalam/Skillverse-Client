import React from "react";
import "./Registration.css";
import { useState } from "react";
import { studentAuth } from "../../domain/models/student";
import { api } from "../../services/axios";
import { validate } from "./Validate";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

function StudentForm() {
  const navigate = useNavigate();
  const [student, setStudent] = useState<studentAuth>({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const addStudent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
    validate(
      e.target.name,
      e.target.value,
      errors,
      setErrors,
      student.password
    );
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { fname, lname, username, email, password, confirm_password } =
        student;
      if (
        fname !== "" &&
        lname !== "" &&
        username !== "" &&
        email !== "" &&
        password !== "" &&
        confirm_password !== ""
      ) {
        const { fname, lname, username, email, password, cpassword } = errors;
        if (
          fname === "" &&
          lname === "" &&
          username === "" &&
          email === "" &&
          password === "" &&
          cpassword === ""
        ) {
          const { data } = await api.post(
            "/register",
            { ...student },
            { withCredentials: true }
          );
          console.log("data", data);

          if (data.student) {
            navigate("/login");
          } else {
            navigate("/registration");
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const gSignup = async (res: CredentialResponse) => {
    const result: any = jwtDecode(res.credential as string);
    console.log("ress=", result);

    const student = {
      fname: result.name.split(" ")[0],
      lname: result.name.split(" ")[1],
      username: result.email.split("@")[0],
      email: result.email,
      password: "123Google@@",
      isGoogle: true,
    };
    try {
      const { data } = await api.post(
        "/register",
        { ...student },
        { withCredentials: true }
      );
      console.log("data=", data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-lg mb-7 flex items-center justify-center  border border-gray-300 rounded-md bg-white mx-4 sm:mx-auto ">
      <form action="" className=" w-full p-6" onSubmit={handleSignup}>
        <div className="block md:flex md:space-x-4">
          <div className="mb-3">
            <label htmlFor="formInputControl1" className="text-sm">
              First Name*
            </label>
            <input
              type="text"
              id="formInputControl1"
              name="fname"
              className="inputStyle"
              required
              onChange={addStudent}
            />
            <p className="text-red-600 text-sm">{errors.fname}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="formInputControl2" className="text-sm">
              Last Name*
            </label>
            <input
              type="text"
              id="formInputControl2"
              name="lname"
              className="inputStyle"
              required
              onChange={addStudent}
            />
            <p className="text-red-600 text-sm">{errors.lname}</p>
          </div>
        </div>

        <div className="block md:flex md:space-x-4 mb-3 w-full">
          <div className="md:w-1/2 mb-3">
            <label htmlFor="formInputControl3" className="text-sm">
              Username*
            </label>
            <input
              type="text"
              id="formInputControl3"
              name="username"
              className="inputStyle"
              required
              onChange={addStudent}
            />
            <p className="text-red-600 text-sm">{errors.username}</p>
          </div>
          <div className="md:w-1/2 mb-3">
            <label htmlFor="formInputControl4" className="text-sm">
              Email*
            </label>
            <input
              type="email"
              id="formInputControl4"
              name="email"
              className="inputStyle"
              required
              onChange={addStudent}
            />
            <p className="text-red-600 text-sm">{errors.email}</p>
          </div>
        </div>

        <div className="block md:flex md:space-x-4 mb-3 w-full">
          <div className="md:w-1/2 mb-3">
            <label htmlFor="formInputControl5" className="text-sm">
              Password*
            </label>
            <input
              type="password"
              id="formInputControl5"
              name="password"
              className="inputStyle"
              required
              onChange={addStudent}
            />
            <p className="text-red-600 text-sm">{errors.password}</p>
          </div>
          <div className="md:w-1/2 mb-3">
            <label htmlFor="formInputControl6" className="text-sm">
              Confirm Password*
            </label>
            <input
              type="password"
              id="formInputControl6"
              name="confirm_password"
              className="inputStyle"
              required
              onChange={addStudent}
            />
            <p className="text-red-600 text-sm">{errors.cpassword}</p>
          </div>
        </div>
        <div className="block justify-center mb-4  mt-7 md:mt-4">
          <button className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md w-full hover:bg-gray-700 transition duration-150 ease-out">
            Sign Up
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex-grow">
            <hr className="border-gray-300" />
          </div>
          <span className="mx-2 text-sm">or</span>
          <div className="flex-grow">
            <hr className="border-gray-300" />
          </div>
        </div>

        <div className="mt-3 text-center mb-3">
          <p className="text-sm">
            Already have an account?
            <button>
              <span className="ml-1 text-cyan-600 hover:text-cyan-700">
                Login here
              </span>
            </button>
          </p>
        </div>

        <div className="flex justify-center ">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              gSignup(credentialResponse);
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
