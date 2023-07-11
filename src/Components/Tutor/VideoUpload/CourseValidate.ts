//  const courseValidate = (title:string,fee:string,description:string,category:string,subcategory:string[],selectedThumbnail:File | null,selectedVideo:File,err:object,setErr:Function) =>{
//     const titleRegex : RegExp = /^[A-Za-z ]{3,20}$/;
//     const feeRegex : RegExp = /^[0-9 ]{1,4}$/;
//     if((title.trim()).length === 0){
//         setErr({...err,title:'Title field cannot be empty!'})
//     }
//     else if(!titleRegex.test(title)){
//         setErr({...err,title:'Enter a valid title'})
//     }
//     else{
//         setErr({...err,title:''})
//     }

//     if((fee.trim()).length === 0){
//         setErr({...err,fee:'Fee field cannot be empty!'})
//     }
//     else if(!feeRegex.test(fee)){
//         setErr({...err,fee:'Enter a valid fee'})
//     }
//     else{
//         setErr({...err,fee:''})
//     }
    
// }
// export default courseValidate

const courseValidate = (
    title: string,
    fee: string,
    description: string,
    category: string,
    subcategory: string[],
    selectedThumbnail: File | null,
    selectedVideo: File,
    err: object,
    setErr: Function
  ) => {
    const titleRegex: RegExp = /^[A-Za-z ]{3,20}$/;
    const feeRegex: RegExp = /^[0-9]{1,4}$/;
    const descriptionRegex: RegExp = /^.{10,500}$/;

    setErr((prevErr: object) => ({
      ...prevErr,
      title: (title.trim().length === 0) ? 'Title field cannot be empty!' : (!titleRegex.test(title) ? 'Enter a valid title' : ''),
      fee: (fee.trim().length === 0) ? 'Fee field cannot be empty!' : (!feeRegex.test(fee) ? 'Enter a valid fee' : ''),
      category: (category.trim().length === 0) ? 'Please select the category!' : '',  
      description: (description.trim().length === 0) ? 'Description field cannot be empty!' : (!descriptionRegex.test(description) ? 'Enter a valid description' : ''),
      thumbnail : (selectedThumbnail?.name.trim().length === 0) ? 'Please choose a thumbnail!' : '',
      video : (selectedVideo?.name.trim().length === 0) ? 'Please choose a video!' : '',
    }));
  };
  
  export default courseValidate;
  