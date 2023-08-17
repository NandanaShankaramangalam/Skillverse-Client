import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { api } from "../../../services/axios";

interface CategoryProps {
  cid: string;
  catname: string;
  isEditOpen: boolean;
  setIsEditOpen: Function;
  fetchData: Function;
}
function EditCategory(props: CategoryProps) {
  const [category, setCategory] = useState(props.catname);
  const [errors, setErrors] = useState({ cate: "" });

  const closeEditModal = () => {
    props.setIsEditOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("aaa");

    try {
      const cateRegex: RegExp = /^[A-Za-z ]{3,20}$/;
      if (category.trim().length === 0) {
        setErrors({ ...errors, cate: "Category field cannot be empty!" });
      } else if (!cateRegex.test(category)) {
        setErrors({ ...errors, cate: "Enter a valid category name!" });
      } else {
        setErrors({ ...errors, cate: "" });
        const { data } = await api.post(
          "/admin/edit-category",
          { category, cid: props.cid },
          { withCredentials: true }
        );
        console.log("edit cat", data);
        closeEditModal();
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
          <button onClick={closeEditModal}>
            <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
          </button>
        </div>
        <div className="text-center">
          <h1 className="font-bold">{props.catname}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 mt-3">
            <label htmlFor="formInputControl1" className="text-sm ">
              Category
            </label>
            <input
              type="text"
              id="formInputControl1"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="subcategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <p className="text-red-600 text-sm mb-3">{errors.cate}</p>

          <div className="flex justify-center">
            <button className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out">
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
