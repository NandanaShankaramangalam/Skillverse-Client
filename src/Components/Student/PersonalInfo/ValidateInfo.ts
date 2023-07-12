export const validateInfo = (fname:string,lname:string,username:string,email:string,err: object,
    setErr: Function) =>{
    
        const fnameRegex : RegExp = /^[A-Za-z]{4,10}$/;
        const lnameRegex : RegExp = /^[A-Za-z]{1,10}$/;
        const usernameRegex : RegExp = /^[A-Za-z]{4,10}$/;
        const emailRegex : RegExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        setErr((prevErr: object) => ({
            ...prevErr,
            fname: (fname.trim().length === 0) ? 'First Name field cannot be empty!' : (!fnameRegex.test(fname) ? 'Enter a valid first name' : ''),
            lname: (lname.trim().length === 0) ? 'Last Name field cannot be empty!' : (!lnameRegex.test(lname) ? 'Enter a valid last name' : ''),
            username: (username.trim().length === 0) ? 'Username field cannot be empty!' : (!usernameRegex.test(username) ? 'Enter a valid username' : ''),
            email: (email.trim().length === 0) ? 'Email field cannot be empty!' : (!emailRegex.test(email) ? 'Enter a valid email' : ''),
            
          }));    
} 