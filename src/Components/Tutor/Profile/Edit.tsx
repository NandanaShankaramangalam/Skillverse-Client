import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../../services/axios";
import AWS from "aws-sdk";
import { s3Config } from "../../../s3Config";
import Resizer from "react-image-file-resizer";
import { ValidateEditProfile } from "./ValidateEditProfile";

interface ProfileProps {
  isOpen: boolean;
  setIsOpen: Function;
}
interface ErrState {
  image?: string;
  description?: string;
  profile?: string;
  niche?: string;
}

function Edit(props: ProfileProps) {
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
  AWS.config.update({
    accessKeyId: "YOUR_ACCESS_KEY",
    secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
    region: "YOUR_REGION",
  });

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

  const resizeFile = (file: File): Promise<Blob> =>
    new Promise((resolve) => {
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

  //----------------------------------------------
  const uploadFile = async (
    e: React.MouseEvent<HTMLButtonElement>,
    bannerFile: any,
    profileFile: any
  ) => {
    e.preventDefault();
    try {
      console.log("a", profileFile);

      ValidateEditProfile(
        selectedProfile,
        niche,
        selectedImage,
        description,
        err,
        setErr
      );
      console.log("b", bannerFile);

      const s3 = new AWS.S3({
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
        region: s3Config.region,
      });

      if (
        err.profile === "" &&
        err.niche === "" &&
        err.image === "" &&
        err.description === ""
      ) {
        console.log("c");
        const uploadPromises = [];
        if (profileFile?.name != "") {
          const resizedProfileImage = await resizeFile(profileFile);
          const profileParams = {
            Body: resizedProfileImage as Blob,
            Bucket: s3Config.bucketName,
            Key: `profile/${profileFile.name}`,
          };
          const profileUploadPromise = s3.upload(profileParams).promise();
          uploadPromises.push(profileUploadPromise);
        }

        if (bannerFile?.name != "") {
          const resizedBannerImage = await resizeFile(bannerFile);
          const bannerParams = {
            Body: resizedBannerImage as Blob,
            Bucket: s3Config.bucketName,
            Key: `images/${bannerFile.name}`,
          };

          const bannerUploadPromise = s3.upload(bannerParams).promise();
          uploadPromises.push(bannerUploadPromise);
        }
        if (uploadPromises.length > 0) {
          await Promise.all(uploadPromises);
          setProfileLocation((await uploadPromises[0]).Key);
          setBannerLocation((await uploadPromises[1]).Key);
        }
        console.log("d");

        const result = await api.post(
          `/tutor/edit-profile/${tutId}`,
          { profileLocation, bannerLocation, niche, description, tutId },
          { withCredentials: true }
        );
      }
    } catch (err) {
      console.log(err);
    }

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProfileImage("");
      const file: File | null = e.target.files?.[0] || null;
      setSelectedProfile(file as File);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setImage("");
      const file: File | null = e.target.files?.[0] || null;
      setSelectedImage(file as File);
    };
    const handleNicheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNiche(e.target.value);
    };
    const handleDescriptionChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setDescription(e.target.value);
    };

    const closeModal = () => {
      props.setIsOpen(false);
    };
    return (
      <div>
        <div className="absolute inset-0  top-20 left-72 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg h-96 overflow-y-scroll  shadow-lg">
            <div className="flex justify-end">
              <button onClick={closeModal}>
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
              </button>
            </div>
            <h1 className="font-bold text-center mb-1 text-lg">
              Create Profile
            </h1>
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

              <div className="flex justify-center"></div>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

export default Edit;
