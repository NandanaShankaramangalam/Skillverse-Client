import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isBrowseOpen, setIsBrowseOpen] = useState<boolean>(false);
  const handleMenuToggle = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setIsMenuVisible(!isMenuVisible);
  };
  const handleBrowseToggle = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setIsBrowseOpen(!isBrowseOpen);
  };
  return (
    <div>
      <nav className="bg-custom-blue text-white flex items-center justify-between h-20 px-4 md:px-6">
        <div className="ml-3">
          <h1 className="text-xl font-bold"><NavLink to='/'>Skillverse</NavLink></h1>
        </div>
        <div className="md:hidden">
          <button
            className="flex items-center text-white focus:outline-none"
            onClick={handleMenuToggle}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-current"
                d="M4 6H20M4 12H20M4 18H20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-3 text-sm">
          <li>
            <button>
              <span>Home</span>
            </button>
          </li>
          <li>
            <button>
              <span>Tutors</span>
            </button>
          </li>
          <li>
            <button onClick={handleBrowseToggle}>
              <span>Browse</span>
            </button>
          </li>
          <li>
            <button onClick={()=>navigate('/login')}>
              <span>Login</span>
            </button>
          </li>
        </ul>
      </nav>
      {isBrowseOpen && (
        <div className="hidden md:block fixed top-20 right-4 mt-2 bg-slate-300 text-gray-800  h-40 w-40 ps-2 rounded overflow-y-auto ml-auto">
          <ul className="mt-2">
            <li>Category1</li>
            <li>Category2</li>
            <li>Category3</li>
            <li>Category1</li>
            <li>Category2</li>
            <li>Category3</li>
            <li>Category1</li>
            <li>Category2</li>
            <li>Category3</li>
            <li>Category1</li>
            <li>Category2</li>
            <li>Category3</li>
          </ul>
        </div>
      )}

      <div
        className={`w-full  md:hidden bg-custom-blue text-white  justify-center ${
          isMenuVisible ? "flex" : "hidden"
        }`}
      >
        <div className="w-full">
          <h1 className=" border-black-200 cursor-pointer py-2 text-sm ml-2">
            Home
          </h1>
          <h1 className=" border-black-200 cursor-pointer  py-2 text-sm ml-2">
            Tutors
          </h1>
          <h1 className=" border-black-200 cursor-pointer  py-2 text-sm ml-2">
            Browse
          </h1>
          <h1 className=" border-black-200 cursor-pointer  py-2 text-sm ml-2">
            Login
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
