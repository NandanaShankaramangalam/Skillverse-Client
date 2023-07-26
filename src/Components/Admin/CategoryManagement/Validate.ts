export const validate = (name:string,value:string,err:object,setErr:Function): void =>{
    console.log('valll');
    
    if(name === 'cate'){
        console.log('val==',value);
        console.log('aaaaa');
        
        
        cateValidate(value,err,setErr);

        console.log('bbbb');
        
    }
    // if(name === 'subcate'){
    //     subcateValidate(value,err,setErr);
    // }
 }
 

    const cateValidate = (value:string,err:object,setErr:Function): void =>{
    console.log('jjjj');
    
    const cateRegex : RegExp = /^[A-Za-z ]{3,20}$/;
    if((value.trim()).length === 0){
        console.log('zzz');
        
        setErr({...err,cate:'Category field cannot be empty!'})
    }
    else if(!cateRegex.test(value)){
        console.log('uuu');
        
        setErr({...err,cate:'Enter a valid category name'})
    }
    else{
        setErr({...err,cate:''})
    }
 }

//  export const subcateValidate = (value:string,err:object,setErr:Function): void =>{
   
//     const subcateRegex : RegExp = /^([a-zA-z])([a-zA-Z,\s])+([^(?=.*,\s$)])$/gm
//     if((value.trim()).length === 0){
//         setErr({...err,subcate:'Subcategory field cannot be empty!'})
//     }
//     else if(!subcateRegex.test(value)){
//         setErr({...err,subcate:'Enter a valid subcategory name'})
//     }
//     else{
//         setErr({...err,subcate:''})
//     }
//  }