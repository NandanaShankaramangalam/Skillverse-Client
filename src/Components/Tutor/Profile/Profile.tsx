import React, { useState } from "react";
import AddProfile from "./AddProfile";

function Profile() {
  const [addProfile, setAddProfile] = useState<boolean>(false);
  const handleAddProfile = () => {
    setAddProfile(true);
  };
  return (
    <div>
      <h1 className="text-center pt-20 md:pt-36 mb-2 text-md text-gray-700">
        Profile is Empty❗
      </h1>
      <h1 className="text-center mb-3 text-xl">Build your profile now 🚀</h1>
      <div className="text-center">
        <button
          onClick={handleAddProfile}
          className="bg-custom-blue rounded-lg text-white py-2 px-3 hover:bg-gray-700 transition duration-150 ease-out"
        >
          Add Profile
        </button>
      </div>

      {addProfile && <AddProfile setAddProfile={setAddProfile} />}
    </div>
  );
}

export default Profile;
