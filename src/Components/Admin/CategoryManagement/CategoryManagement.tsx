import { faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState,useEffect } from 'react'
import React from 'react'
import { validate } from './Validate';
import { api } from '../../../services/axios';
import AddSubcategory from './AddSubcategory';
import EditCategory from './EditCategory';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Category{
    category : string;
    // subcategory : string;
}
interface CategoryData{
    category : string;
    subcategory : string[];
    _id: string;
    status:boolean;
}
function CategoryManagement() {
        const [data, setData] = useState<CategoryData[]>([]);
        const [addData,setAddData] = useState({cid:'',catname:''})
        // const [addData,setAddData] = useState({cid:'',catname:''})
        // const [addData,setAddData] = useState('')
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
        const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
        // const [categories,setCategory] = useState<Category>({category:'',subcategory:''});
        const [categories,setCategory] = useState<Category>({category:''});
        // const [errors,setErrors] = useState({cate:'',subcate:''})
        const [errors,setErrors] = useState({cate:''})

        const openModal = () => {
          setIsOpen(true);
        };
      
        const closeModal = () => {
          setIsOpen(false);
        };

        const openAddModal = (cid:string,catname:string) => {
          // console.log('cid=',cid);
          console.log('catname=',catname);
          setAddData({...addData,catname:catname,cid:cid});
          // setAddData(catname);
          // setAddData({ cid: cid, catname: catname });
          console.log('adddata',addData); 
          setIsAddOpen(true);
        };

        const openEditModal = (cid:string,catname:string) => {
          console.log('catname=',catname);
          setAddData({...addData,catname:catname,cid:cid});
          console.log('adddata',addData);  
          setIsEditOpen(true);
        };
      
        const closeAddModal = () => {
          setIsAddOpen(false);
        };
        
        useEffect(() => { 
          fetchData();
          // console.log('hiii',addData);
          
        }, []);

        const fetchData = async() => {
          try{
            const response = await api.get('/admin/show-category');
            console.log('cate data res= ',response.data);
            // setData(response.data.cateData)
            setData(response.data.newArray)
            console.log('dataaa=',data);
            
            // console.log('cat data',response.data.newArray[0].category);
          }
          catch(err){
           console.error(err);
          }
       }

        const handleSubmit = async(e: React.FormEvent) => {
          e.preventDefault();
          console.log('yyy');
          
          try{  
            // const {category,subcategory} = categories;
            const {category} = categories;
            // const category = categories.cate
            // const subcategory = categories.subcate
            console.log('cat=',categories);
            console.log('errcat=',errors.cate);
            
            // if(category!=='' && subcategory!==''){
              if(category===''){
                console.log('cat=',category);
                setErrors({...errors,cate:'Category cannot be empty!'})
              }
                // const {cate} = errors;
               // if(cate==='' && subcate===''){
              else{
                setErrors({...errors,cate:''})
                console.log('errcatttt=',errors.cate); 
                const {data} = await api.post('/admin/add-category',{...categories},{withCredentials:true})
                // await api.post('/admin/add-category',{...category},{withCredentials:true})
                console.log('add cat',data);
                closeModal();
                fetchData();
            } 
            
           
          }catch(err){
            console.log(err);    
         }
        };
        
        //Add Category
        const addCate = ((e:React.ChangeEvent<HTMLInputElement>)=>{
            setCategory({...categories,[e.target.name]:e.target.value});
            validate(e.target.name, e.target.value, errors,setErrors);
        })
        
        //List Category
        const handleList = async(e: React.MouseEvent<HTMLButtonElement>,id:string) =>{
          e.preventDefault();
          try{
              const response = await api.post('/admin/list-category',{id}, { withCredentials: true })
              console.log('rspnse',response.data);
              fetchData();
              
          }catch(err){
              console.log(err);
              
          }
          console.log('iddd',id);
        }


        //Unlist Category
        const handleUnlist = async(e: React.MouseEvent<HTMLButtonElement>,id:string) =>{
          e.preventDefault();
          try{
              const response = await api.post('/admin/unlist-category',{id}, { withCredentials: true })
              console.log('rspnse',response.data);
              fetchData();
              
          }catch(err){
              console.log(err);
              
          }
          console.log('iddd',id);
        }

        const notifySuccess = () => {
          toast.success('New Category added', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1500,
          });
        };
        const notifyCatInactive = () =>{
          toast.error('Category inactive', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1500,
          });
        }
        const notifyCatActive = () =>{
          toast.success('Category active', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1500,
          });
        }
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
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Action</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {
               data.map((item,index)=>(
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index+1}
                </th>
                <td className="px-6 py-4">
                   {item.category}
                </td>
                <td className="px-6 py-4">
                   {/* {item.subcategory.split(',').map(obj=><li>{obj}</li>)} */}
                   {item.subcategory.map(obj=><li>{obj}</li>)}
                </td>
                <td className="px-6 py-4">
                  <div className='pt-1'>
                <button onClick={()=>openAddModal(item._id, item.category)}><FontAwesomeIcon icon={faPlus} className='text-white text-sm bg-cyan-700 p-1 mr-8'></FontAwesomeIcon></button>
                <button onClick={()=>openEditModal(item._id, item.category)}><FontAwesomeIcon icon={faPenToSquare} className='text-white text-sm bg-gray-700 p-1'/></button>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                {/* <div className='pt-7 flex '>
                <button><FontAwesomeIcon icon={faPlus} className='text-white text-sm bg-cyan-700 p-1 mr-4 '></FontAwesomeIcon></button>
                  </div> */}
                {

                       item.status?
                       <button className='rounded-full border px-7 py-2 border-green-600 bg-green-600 text-white' onClick={(e)=>{handleList(e,item._id);notifyCatInactive()}}>Active </button>
                       :
                       <button className='rounded-full border px-6 py-2 border-red-600 bg-red-600 text-white' onClick={(e)=>{handleUnlist(e,item._id);notifyCatActive()}}>Inactive</button>
                    }
                
                </td>
            </tr>
               )) 
            }
        </tbody>
    </table>
</div>
{/* Category Add Modal */}
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
              {/* Category:{addData.catname} */}
              Category
            </label>
            <input
              type="text"
              id="formInputControl1"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="category"
              onChange={addCate}
            />
          </div>
          <p className="text-red-600 text-sm mb-2">{errors.cate}</p>

              {/* <div className="mb-3 mt-5">
            <label htmlFor="formInputControl2" className="text-sm ">
              Subcategory
            </label>
            <input
              type="text"
              id="formInputControl2"
              className="bg-gray-200 hover:shadow-inner appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              name="subcategory"
              onChange={addCate}
            />
          </div> */}
          {/* <p className="text-red-600 text-sm">{errors.subcate}</p> */}

              <div className='flex justify-center'>
                <button onClick={notifySuccess} className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out">
                 Add
                </button> 
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SubCategory Add Modal */}
      {/* {isAddOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            
            <div className='flex justify-end'>
                <button onClick={closeAddModal}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
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
              name="category"
              onChange={addCate}
            />
          </div>
          <p className="text-red-600 text-sm">{errors.cate}</p>

              <div className='flex justify-center'>
                <button className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out">
                 Add
                </button> 
              </div>
            </form>
          </div>
        </div>
      )} */}
      {isAddOpen && <AddSubcategory cid={addData.cid} catname={addData.catname} isAddOpen={isAddOpen} setIsAddOpen={setIsAddOpen} fetchData={fetchData}/>}
      {isEditOpen && <EditCategory cid={addData.cid} catname={addData.catname} isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} fetchData={fetchData}/>}
      <ToastContainer />
</div> 
  )
}

export default CategoryManagement