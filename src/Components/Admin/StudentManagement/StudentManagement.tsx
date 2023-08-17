import React from "react";
import { api } from "../../../services/axios";
import { useEffect, useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface studData {
  fname: string;
  lname: string;
  username: string;
  email: string;
  _id: string;
  status: boolean;
}
function StudentManagement() {
  const [data, setData] = useState<studData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUnblockOpen, setIsUnblockOpen] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/admin/student-data");
      console.log("stud data res= ", response.data);
      setData(response.data.studentData);
      console.log("lll", data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/admin/block-student",
        { id },
        { withCredentials: true }
      );
      console.log("rspnse", response.data);
      fetchData();
    } catch (err) {
      console.log(err);
    }
    console.log("iddd", id);
  };

  const handleUnblock = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/admin/unblock-student",
        { id },
        { withCredentials: true }
      );
      console.log(response);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-11">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-xl font-semibold  text-gray-900 bg-white dark:text-white dark:bg-gray-800 text-center">
            Student Management
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sl.No
              </th>
              <th scope="col" className="px-6 py-3">
                Student Name
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={index}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{item.fname + " " + item.lname}</td>
                <td className="px-6 py-4">{item.username}</td>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4 text-right">
                  {item.status ? (
                    <button
                      className="rounded-full border px-5 py-2 border-green-600 bg-green-600 text-white mr-2"
                      onClick={(e) => {
                        setIsOpen(true);
                        setId(item._id);
                      }}
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      className="rounded-full border px-3 py-2 border-red-600 bg-red-600 text-white mr-2"
                      onClick={(e) => {
                        setIsUnblockOpen(true);
                        setId(item._id);
                      }}
                    >
                      Unblock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Block */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)}>
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </button>
            </div>

            <form>
              <div className="mb-3 mt-3">
                <h1>Are you sure you want to block?</h1>
              </div>
              <div className="flex justify-center gap-1">
                <button
                  onClick={(e) => {
                    handleBlock(e, id);
                    setIsOpen(false);
                  }}
                  className="bg-red-700 text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out"
                >
                  Block
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="bg-green-800 text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Unblock */}
      {isUnblockOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-end">
              <button onClick={() => setIsUnblockOpen(false)}>
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </button>
            </div>

            <form>
              <div className="mb-3 mt-3">
                <h1>Are you sure you want to block?</h1>
              </div>
              <div className="flex justify-center gap-1">
                <button
                  onClick={(e) => {
                    handleUnblock(e, id);
                    setIsUnblockOpen(false);
                  }}
                  className="bg-yellow-600 text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out"
                >
                  Unblock
                </button>
                <button
                  onClick={() => {
                    setIsUnblockOpen(false);
                  }}
                  className="bg-green-800 text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentManagement;
