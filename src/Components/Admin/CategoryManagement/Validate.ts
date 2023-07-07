export const validate = (name:string,value:string,err:object,setErr:Function): void =>{
    console.log('valll');
    
    if(name === 'cate'){
        cateValidate(value,err,setErr);
    }
    if(name === 'subcate'){
        subcateValidate(value,err,setErr);
    }
 }
 

 export const cateValidate = (value:string,err:object,setErr:Function): void =>{
    const cateRegex : RegExp = /^[A-Za-z ]{3,20}$/;
    if((value.trim()).length === 0){
        setErr({...err,cate:'Category field cannot be empty!'})
    }
    else if(!cateRegex.test(value)){
        setErr({...err,cate:'Enter a valid category name'})
    }
    else{
        setErr({...err,cate:''})
    }
 }

 export const subcateValidate = (value:string,err:object,setErr:Function): void =>{
    // const subcateRegex : RegExp = /^[A-Za-z, ]{3,20}$/;
    const subcateRegex : RegExp = /^([a-zA-z])([a-zA-Z,\s])+([^(?=.*,\s$)])$/gm
    if((value.trim()).length === 0){
        setErr({...err,subcate:'Subcategory field cannot be empty!'})
    }
    else if(!subcateRegex.test(value)){
        setErr({...err,subcate:'Enter a valid subcategory name'})
    }
    else{
        setErr({...err,subcate:''})
    }
 }