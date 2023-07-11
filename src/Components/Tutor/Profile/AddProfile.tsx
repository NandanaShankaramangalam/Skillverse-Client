import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import AWS from 'aws-sdk'
import Resizer from "react-image-file-resizer";
import { api } from '../../../services/axios';
import  { s3Config }  from '../../../s3Config';
import { myBucket } from '../../../s3Config';
import { useDispatch, useSelector } from 'react-redux';
interface ProfileProps{
    setAddProfile : Function;
}

interface ErrState {
    image?: string;
    description?: string;
  }

// const S3_BUCKET =s3Config.bucketName;
// const REGION =s3Config.region;

// AWS.config.update({
//   accessKeyId: s3Config.accessKeyId,
//   secretAccessKey: s3Config.secretAccessKey
// })

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET},
//   region: REGION,
// })


// const myBucket = new AWS.S3({
//   region: REGION,
// });
function AddProfile(props:ProfileProps) {
    
    const [progress , setProgress] = useState(0);
    const [selectedImage, setSelectedImage] = useState<File>(new File([], ''));
    const [description, setDescription] = useState('');
    const [err,setErr] = useState<ErrState>({image:'',description:''});
    const dispatch = useDispatch();
    const { tutUsername, tutEmail, tutId } = useSelector((state: any) => state.tutor);
    
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
  
    const uploadFile = async(e:React.MouseEvent<HTMLButtonElement>,file:any) => {
        e.preventDefault();
  try{
    console.log('kkrrrr');
    console.log('sel img=',selectedImage);
    
    if (selectedImage.name==='') {
        setErr({image:'No file selected!'})
        console.error('No file selected.');
    //   return;
    }
    // if (!file) {
    //     setErr(prevState => ({
    //       ...prevState,
    //       image: 'No file selected.',
    //     }));
    //     return;
    //   }
    else if(!description){
        setErr({description:'No description!'})
        console.error('No description!');
    }
    else{
        setErr({description:''})
        const resizedImage = await resizeFile(file);
    const params = {
            // ACL: 'public-read',
            Body: resizedImage as Blob,
            // Bucket: S3_BUCKET,
            Bucket: s3Config.bucketName,
            Key: `images/${file.name}`
        };
  
        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            }).on("success",async(response)=>{
              console.log('res',response.data);
              const fileLoc = `https://s3.amazonaws.com/${params.Bucket}/${params.Key}`;
              const fileLocation = `${params.Key}`;
              // console.log("Location:", response.Location);
              console.log('File location:', fileLocation);
              console.log('File loc:', fileLoc);
              
              const result = await api.post('/tutor/add-profile',{fileLocation,description,tutId},{ withCredentials: true })
              console.log('result=',result);
              
            })
            .send((err,data) => {
                if (err) console.log(err)
                else console.log('data=',data);
            })

        }

  }catch(err){
    console.log(err);
    
  }
        
    }
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | null = e.target.files?.[0] || null;
        setSelectedImage(file as File);
      };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
      };

    const closeModal = () =>{
        props.setAddProfile(false);
    }
  return (
    <div>
        <div className="absolute inset-0  top-20 left-72 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded-lg h-96 overflow-y-scroll  shadow-lg">
            {/* <div className='bg-custom-blue'>
                <h2 className="text-lg font-bold mb-4 text-center text-white">Add Category</h2>
            </div> */}
            <div className='flex justify-end'>
                <button onClick={closeModal}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></button>
            </div>
            <h1 className='font-bold text-center mb-1 text-lg'>Create Profile</h1>
            <form >
              
            <div className="mb-2 mt-3">
            <label htmlFor="formInputControl1" className="text-sm ">
              Banner Image
            </label>
            <input accept="image/jpeg,image/png,image/gif" name="thumbnail"
//  onChange={handleUpload}
             onChange={handleImageChange}
             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
             <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>


          </div>
          <p className="text-red-600 text-sm">{err.image}</p>

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
            //   value={(e)=>e.target.value}
            //   onChange={addData}
            value={description} 
            onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <p className="text-red-600 text-sm">{err.description}</p>

              <div className='flex justify-center'>
                <button onClick={(e) => uploadFile(e,selectedImage)} className="bg-custom-blue text-white py-2 px-6 text-sm rounded-md  hover:bg-gray-700 transition duration-150 ease-out">
                 Add 
                </button> 
              </div>
            </form>
          </div>
        </div>
    

    </div>
  )
}

export default AddProfile