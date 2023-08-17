import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { api } from "../../../services/axios";
interface SubCategoryProps {
  cid: string;
  catname: string;
  isAddOpen: boolean;
  setIsAddOpen: Function;
  fetchData: Function;
}
function AddSubcategory(props: SubCategoryProps) {
  const [subcategory, setSubcategory] = useState("");
  const [errors, setErrors] = useState({ subcate: "" });
  const closeAddModal = () => {
    props.setIsAddOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("aaa");

    try {
      const subcateRegex: RegExp = /^[A-Za-z ]{3,20}$/;
      if (subcategory.trim().length === 0) {
        setErrors({ ...errors, subcate: "Subcategory field cannot be empty!" });
      } else if (!subcateRegex.test(subcategory)) {
        setErrors({ ...errors, subcate: "Enter a valid subcategory name!" });
      } else {
        setErrors({ ...errors, subcate: "" });
        const { data } = await api.post(
          "/admin/add-subcategory",
          { subcategory, cid: props.cid },
          { withCredentials: true }
        );
        console.log("add cat", data);
        closeAddModal();
        props.fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button onClick={closeAddModal}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>
        <div className="text-center">
          <h1 className="font-bold">{props.catname}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 mt-3">
            <label htmlFor="formInputControl1" className="text-sm ">
              Subcategory
            </label>
            <input
              type="text"
              id="formInputControl1"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="subcategory"
              onChange={(e) => setSubcategory(e.target.value)}
            />
          </div>
          <p className="text-red-600 text-sm mb-3">{errors.subcate}</p>

          <div className="flex justify-center">
            <button className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubcategory;
