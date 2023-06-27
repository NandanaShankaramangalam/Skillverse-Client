import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import React from 'react'
import { validate } from './Validate';
import { api } from '../../../services/axios';

interface Category{
    cate : string;
    subcate : string;
}
function CategoryManagement() {
    
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [category,setCategory] = useState<Category>({cate:'',subcate:''});
        const [errors,setErrors] = useState({cate:'',subcate:''})

        const openModal = () => {
          setIsOpen(true);
        };
      
        const closeModal = () => {
          setIsOpen(false);
        };
      
        const handleSubmit = async(e: React.FormEvent) => {
          e.preventDefault();
          try{
            
            
            const {cate,subcate} = category;
            console.log('cat=',category);
            
            if(cate!=='' && subcate!==''){
                console.log('cat=',category);
            const {cate,subcate} = errors;
            if(cate==='' && subcate===''){
                console.log('mmmmm'); 
                const {data} = await api.post('/admin/add-category',{...category},{withCredentials:true})
                // await api.post('/admin/add-category',{...category},{withCredentials:true})
                closeModal();
            } 
            }
           
          }catch(err){
            console.log(err);    
         }
        };

        const addCate = ((e:React.ChangeEvent<HTMLInputElement>)=>{
            setCategory({...category,[e.target.name]:e.target.value});
            validate(e.target.name, e.target.value, errors,setErrors);
        })
   
  return (
    <div className='mt-5'>
        <div className='flex justify-end mr-11 mb-2'>
        <button className='bg-yellow-500 rounded-lg text-white py-2 px-3 hover:bg-yellow-400' onClick={openModal}>
            Add <FontAwesomeIcon icon={faPlus} className='text-white text-lg'></FontAwesomeIcon>
        </button>
        </div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-10">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption className="p-5 text-xl font-semibold  text-gray-900 bg-white dark:text-white dark:bg-gray-800 text-center">
            Category Management
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Sl.No
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Subcategory
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Actions</span>
                </th>
            </tr>
        </thead>
        <tbody>
           
        </tbody>
    </table>
</div>

{isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* <div className='bg-custom-blue'>
                <h2 className="text-lg font-bold mb-4 text-center text-white">Add Category</h2>
            </div> */}
            <div className='flex justify-end'>
                <button onClick={closeModal}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3 mt-3">
            <label htmlFor="formInputControl1" className="text-sm ">
              Category
            </label>
            <input
              type="text"
              id="formInputControl1"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="cate"
              onChange={addCate}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.cate}</p>

              <div className="mb-3 mt-5">
            <label htmlFor="formInputControl2" className="text-sm ">
              Subcategory
            </label>
            <input
              type="text"
              id="formInputControl2"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="subcate"
              onChange={addCate}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.subcate}</p>

              <div className='flex justify-center'>
                <button className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out">
                 Add
                </button> 
              </div>
            </form>
          </div>
        </div>
      )}
</div> 
  )
}

export default CategoryManagement