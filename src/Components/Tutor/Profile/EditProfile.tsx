import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { s3Config } from "../../../s3Config";
import Resizer from "react-image-file-resizer";
import { api } from "../../../services/axios";
import AWS from "aws-sdk";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProfileProps {
  isOpen: boolean;
  setIsOpen: Function;
  callback: Function;
}
interface ErrState {
  image?: string;
  description?: string;
  profile?: string;
  niche?: string;
}

function EditProfile(props: ProfileProps) {
  const { tutId } = useSelector((state: any) => state.tutor);
  const [description, setDescription] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File>(new File([], ""));
  const [selectedProfile, setSelectedProfile] = useState<File>(
    new File([], "")
  );
  const [image, setImage] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [niche, setNiche] = useState("");
  const [profileLocation, setProfileLocation] = useState<string>("");
  const [bannerLocation, setBannerLocation] = useState<string>("");
  const [err, setErr] = useState<ErrState>({
    profile: "",
    niche: "",
    image: "",
    description: "",
  });
  const [fileUpload, setFileUpload] = useState(false);
  const s3 = new AWS.S3();
  useEffect(() => {
    fetchProfileData();
  }, []);
  const fetchProfileData = async () => {
    try {
      const profileData = await api.get(`/tutor/profile/${tutId}`);
      console.log("profdata=", profileData.data.profileData);
      const { profileLocation, bannerLocation, description, niche } =
        profileData.data.profileData;
      setDescription(description);
      console.log("file=", bannerLocation);
      setNiche(niche);
      const fileName = bannerLocation.split("/").pop();
      setImage(fileName);
      const profileName = profileLocation.split("/").pop();
      setProfileImage(profileName);
      console.log("desc=", description);

      console.log("filename=", fileName);
    } catch (error) {
      console.error("Error retrieving the image:", error);
    }
  };

  const resizeFile = (file: File): Promise<Blob> => {
    console.log("hhhhhhhhhpppppph");

    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri: string | Blob | ProgressEvent<FileReader>) => {
          if (typeof uri === "string") {
            resolve(new Blob([uri], { type: "image/jpeg" }));
          } else if (uri instanceof Blob) {
            resolve(uri);
          }
        },
        "blob"
      );
    });
  };

  const uploadProfile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    profileFile: any
  ) => {
    e.preventDefault();
    console.log("profffffffffffffffff=", profileFile);

    const resizedProfileImage = await resizeFile(profileFile);
    console.log("kkkkkkkkkkk");
    const profileParams = {
      Body: resizedProfileImage as Blob,
      Bucket: s3Config.bucketName,
      Key: `profile/${profileFile.name}`,
    };
    s3.upload(profileParams)
      .promise()
      .then((profileResponse) => {
        // Handle the result of the upload
        const profileLoc = `${profileResponse.Key}`;
        setProfileLocation(profileLoc);
        console.log("Profile location:", profileLoc);
        console.log("Profile upload success:", profileResponse);
      })
      .catch((error) => {
        // Handle any errors that occurred during the upload
        console.error("Profile upload error:", error);
      });
  };

  const uploadBanner = async (
    e: React.ChangeEvent<HTMLInputElement>,
    bannerFile: any
  ) => {
    e.preventDefault();

    console.log("zzzzzzzzzzzz", bannerFile);
    const resizedBannerImage = await resizeFile(bannerFile);
    console.log("kkkkkkkkkkk");
    const bannerParams = {
      Body: resizedBannerImage as Blob,
      Bucket: s3Config.bucketName,
      Key: `images/${bannerFile.name}`,
    };
    s3.upload(bannerParams)
      .promise()
      .then((bannerResponse) => {
        // Handle the result of the upload
        const bannerLoc = `${bannerResponse.Key}`;
        setProfileLocation(bannerLoc);
        console.log("Banner location:", bannerLoc);
        console.log("Banner upload success:", bannerResponse);
      })
      .catch((error) => {
        // Handle any errors that occurred during the upload
        console.error("Banner upload error:", error);
      });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImage("");
    const file: File | null = e.target.files?.[0] || null;
    setSelectedProfile(file as File);
    uploadProfile(e, selectedProfile);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage("");
    const file: File | null = e.target.files?.[0] || null;
    setSelectedImage(file as File);
    uploadBanner(e, selectedImage);
  };
  const handleNicheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNiche(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const result = await api.post(
        `/tutor/edit-profile/${tutId}`,
        { profileLocation, bannerLocation, niche, description, tutId },
        { withCredentials: true }
      );
      if (result.data.isEdit) {
        console.log("result=", result.data);
        props.setIsOpen(false);
        notifySuccess();
        props.callback({
          profileLocation,
          bannerLocation,
          niche,
          description,
          tutId,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const closeModal = () => {
    props.setIsOpen(false);
  };

  const notifySuccess = () => {
    toast.success("Profile updated", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1500,
    });
  };
  return (
    <div className="">
      <div className="absolute inset-0  top-20 left-72 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg h-96 overflow-y-scroll  shadow-lg">
          <div className="flex justify-end">
            <button onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </button>
          </div>
          <h1 className="font-bold text-center mb-1 text-lg">Create Profile</h1>
          <form>
            <div className="mb-2 mt-3">
              <label htmlFor="formInputControl4" className="text-sm ">
                Profile Image
              </label>
              <input
                accept="image/jpeg,image/png,image/gif"
                name="profile"
                onChange={handleProfileChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="formInputControl4"
                type="file"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
              <p className="text-gray-700 text-sm">{profileImage}</p>
            </div>
            <p className="text-red-600 text-sm mb-1">{err.profile}</p>
            <div className="mb-2 mt-3">
              <label htmlFor="formInputControl2" className="text-sm ">
                Niche
              </label>
              <input
                typeof="text"
                name="niche"
                value={niche}
                onChange={handleNicheChange}
                placeholder="eg : Artist and designer"
                className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                aria-describedby="file_input_help"
              />
            </div>
            <p className="text-red-600 text-sm mb-1">{err.niche}</p>

            <div className="mb-2 mt-3">
              <label htmlFor="formInputControl1" className="text-sm ">
                Banner Image
              </label>
              <input
                accept="image/jpeg,image/png,image/gif"
                name="banner"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
              <p className="text-gray-700 text-sm">{image}</p>
            </div>

            <div className="mb-3 mt-3">
              <label htmlFor="formInputControl2" className="text-sm ">
                About me
              </label>
              <textarea
                name="description"
                id="formInputControl3"
                className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                cols={30}
                rows={10}
                style={{ resize: "none" }}
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
            <p className="text-red-600 text-sm">{err.description}</p>

            <div className="flex justify-center">
              <button
                onClick={(e) => handleEdit(e)}
                className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditProfile;
