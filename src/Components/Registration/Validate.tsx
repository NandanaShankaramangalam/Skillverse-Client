export const validate = (name:string,value:string,err:object,setErr:Function,pw:string): void =>{
   if(name === 'fname'){
     fnameValidate(value,err,setErr);
   }
   if(name === 'lname'){
    lnameValidate(value,err,setErr);
   }
   if(name === 'username'){
    usernameValidate(value,err,setErr);
   }
   if(name === 'email'){
    emailValidate(value,err,setErr);
   }
   if(name === 'password'){
    passwordValidate(value,err,setErr);
   }
   if(name === 'confirm_password'){
    cpasswordValidate(value,err,setErr,pw);
   }
}

export const fnameValidate = (value:string,err:object,setErr:Function): void =>{
    const fnameRegex : RegExp = /^[A-Za-z]{4,10}$/;
    if((value.trim()).length === 0){
        setErr({...err,fname:'Firstname field cannot be empty!'})
    }
    else if(!fnameRegex.test(value)){
        setErr({...err,fname:'Enter a valid first name'})
    }
    else{
        setErr({...err,fname:''})
    }
}

export const lnameValidate = (value:string,err:object,setErr:Function): void =>{
    const lnameRegex : RegExp = /^[A-Za-z]{1,10}$/;
    if((value.trim()).length === 0){
        setErr({...err,lname:'Lastname field cannot be empty!'})
    }
    else if(!lnameRegex.test(value)){
        setErr({...err,lname:'Enter a valid last name'})
    }
    else{
        setErr({...err,lname:''})
    }
}

export const usernameValidate = (value:string,err:object,setErr:Function): void =>{
    const usernameRegex : RegExp = /^[A-Za-z]{4,10}$/;
    if((value.trim()).length === 0){
        setErr({...err,lname:'Username field cannot be empty!'})
    }
    else if(!usernameRegex.test(value)){
        setErr({...err,username:'Enter a valid username'})
    }
    else{
        setErr({...err,username:''})
    }
}

export const emailValidate = (value:string,err:object,setErr:Function): void =>{
    const emailRegex : RegExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if((value.trim()).length === 0){
        setErr({...err,email:'Email field cannot be empty!'})
    }
    else if(!emailRegex.test(value)){
        setErr({...err,email:'Enter a valid email'})
    }
    else{
        setErr({...err,email:''})
    }
}

export const passwordValidate = (value:string,err:object,setErr:Function): void =>{
    const passwordRegex : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if((value.trim()).length === 0){
        setErr({...err,password:'Password field cannot be empty!'})
    }
    else if(!passwordRegex.test(value)){
        setErr({...err,password:'Enter a valid password'})
    }
    else{
        setErr({...err,password:''})
    }
}

export const cpasswordValidate = (value:string,err:object,setErr:Function,pw:string): void =>{
    const passwordRegex : RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if((value.trim()).length === 0){
        setErr({...err,cpassword:'Password field cannot be empty!'})
    }
    else if(!passwordRegex.test(value)){
        setErr({...err,cpassword:'Enter a valid password'})
    }
    else if(pw !== value){
        setErr({...err,cpassword:`Confirm password doesn't match!`})
    }
    else{
        setErr({...err,cpassword:''})
    }
}

