import React, { useState } from "react";
import { api } from "../../../services/axios";
import { Navigate, useNavigate } from "react-router-dom";

function ForgotPasswords() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState({ email: "", otpErr: "" });
  const [otp, setOtp] = useState("");
  const [newOtp, setNewOtp] = useState("");
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleSendOtp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const result = await api.post(
      "/tutor/check-tutor",
      { email },
      { withCredentials: true }
    );
    console.log("otp res=", result.data);
    if (result.data.emailExist) {
      setErr({ ...err, email: "" });
      setOtp(result.data.otp);
      setIsReadOnly(true);
    } else {
      setErr({ ...err, email: "Email doesnot exist!" });
    }
  };
  const handleOtpSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (otp == newOtp) {
      navigate("/tutor/reset-password", { state: email });
    } else {
      console.log("otp=", otp);
      console.log("new otp=", newOtp);
      setOtp("");
      setErr({ ...err, otpErr: "OTP is invalid!" });
      return;
    }
  };
  return (
    <div className=" w-full">
      <div className="flex justify-center mt-16 mb-6">
        <h1 className="font-extrabold text-3xl">Forgot Password?</h1>
      </div>
      <div className="max-w-md items-center justify-center  border border-gray-300 rounded-md bg-white mx-4 sm:mx-auto ">
        <div>
          <form action="" className=" w-full ps-6 pe-6 pt-6">
            <div className="mb-3 mt-5">
              <label htmlFor="formInputControl1" className="text-sm ">
                Email*
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="formInputControl1"
                  className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSendOtp}
                  className="bg-custom-blue text-white ml-1 w-24 text-sm rounded-md hover:bg-gray-700 transition duration-150 ease-out"
                >
                  send otp
                </button>
              </div>
              <span className="text-sm text-red-600">{err.email}</span>
            </div>
          </form>
        </div>

        <div>
          <form className=" w-full ps-6 pe-6 pb-6">
            <div className="mb-1">
              <label htmlFor="formInputControl2" className="text-sm">
                Enter OTP*
              </label>
              <input
                type="text"
                id="formInputControl2"
                className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                name="otp"
                readOnly={!isReadOnly}
                onChange={(e) => setNewOtp(e.target.value)}
              />
            </div>

            <div className={`flex justify-center pt-4`}>
              <button
                onClick={handleOtpSubmit}
                className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md w-full hover:bg-gray-700 transition duration-150 ease-out"
              >
                Submit
              </button>
            </div>
            <p className="text-red-600 text-sm mb-1">{err.otpErr}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswords;
