import {
  faBook,
  faGraduationCap,
  faPersonChalkboard,
  faUserLargeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../services/axios";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
Chart.register(ArcElement, Tooltip, BarElement, CategoryScale, LinearScale);

function MainDashBoard() {
  const [courseDetails, setCourseDetails] = useState([
    {
      _id: "",
      title: "",
      fee: "",
      category: "",
      thumbnail: "",
      video: "",
      tutId: "",
      description: "",
      students: "",
      stud: [{ id: "", date: "" }],
      tutorial: [{ title: "", video: "", description: "" }],
    },
  ]);
  const tutorSlice = useSelector((state: any) => state.tutor);
  const tutId = tutorSlice.tutId;
  const [graphData, setGraphData] = useState([{ _id: "", total: 0 }]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    console.log("tutt=", tutId);

    const res = await api.get(`/tutor/dashboard-details/${tutId}`);
    console.log("res==", res.data.dashData);
    console.log("grphhh-=", res.data.graphData);
    setCourseDetails(res.data.dashData);
    setGraphData(res.data.graphData);
    graphData.map((obj) => {
      console.log("hjbjbj", obj._id);
    });
  };

  const BarData = {
    labels: [...graphData.map((obj) => obj._id)],
    datasets: [
      {
        label: "Revenue",
        data: [...graphData.map((obj) => obj.total)],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <div>
        <div className="w-full px-24 flex space-x-4 py-6">
          <div className=" w-full hover:shadow-md bg-slate-100 p-10 pt-3">
            <h1 className="text-gray-400">Revenue per month(in $)</h1>
            <div className="pb-5"></div>
            <div className='flex justify-center h-96' >
            <Bar
              data={BarData}
              options={options}
              className=""
            />
            </div>  
          </div>
        </div>

        <div className="w-full px-24 py-10 pt-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sl.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3">
                    No.of students
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseDetails.map((obj, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-4">{obj.title}</td>
                    <td className="px-6 py-4">{obj.students.length - 1}</td>
                    <td className="px-6 py-4">
                      ${(obj.students.length - 1) * parseInt(obj.fee)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashBoard;
