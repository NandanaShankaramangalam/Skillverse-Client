import React, { useEffect, useState } from "react";
import SideNavbar from "../SideNavbar/SideNavbar";
import { faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import VideoUpload from "../VideoUpload/VideoUpload";
import Profile from "../Profile/Profile";
import { useSelector } from "react-redux";
import { api } from "../../../services/axios";

function Dashboard() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tutor, setTutor] = useState({ description: "", profileLocation: "" });
  const tutorSlice = useSelector((state: any) => state.tutor);
  const tutId = tutorSlice.tutId;
  useEffect(() => {
    const fetchTutorProfile = async () => {
      const res = await api.get(`/view-tutor-profile/${tutId}`);
      console.log("res=", res.data);
      setTutor(res.data.tutorData);
      console.log("aaa=", tutor.description);
      console.log("bbb=", tutor.profileLocation);
    };
    fetchTutorProfile();
  }, []);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div className="grid grid-cols-7 gap-4">
        <div className="md:col-span-2 col-span-7 bg-gray-100">
          <SideNavbar />
        </div>

        <div className="md:col-span-5 col-span-7">
          <div className="justify-end pr-4 flex">
            <div>
              <button onClick={() => openModal()}>
                <span className="font-medium text-sm mr-1">Create</span>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-sm"
                ></FontAwesomeIcon>
              </button>
            </div>
            <div>
              <button>
                <FontAwesomeIcon icon={faVideo} className="text-2xl ml-1" />
              </button>
            </div>
          </div>
          {!tutor.description && !tutor.description ? (
            <div className="w-full h-72">
              <Profile />
            </div>
          ) : (
            <div className="">
              <div className="mt-20">
                <img src="/images/elearning.jpg" alt="" />
                <div className="absolute top-72">
                  <h1 className="text-4xl">Outstanding Online Classes</h1>
                  <span className="text-gray-500">
                    Empowering Minds Globally: Sharing Skills Through Online
                    Learning
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && <VideoUpload setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Dashboard;
