import axios from "axios";
const BASE_URL = 'http://localhost:3001';

export const api =  axios.create({
    baseURL : BASE_URL,
})

export const apiAuth = axios.create({
    baseURL : BASE_URL,
})

api.interceptors.request.use(
    (config)=>{
        let token:any =localStorage.getItem('admin')
        console.log('adm tokn=',token);
        
        if(token) 
        {
            console.log('okay admin tokn');   
            token = JSON.parse(token);
            console.log(token.token,"uuuu");
             token = token.token
             console.log("lolol",token);
        }
        // token = token.token
        // console.log("lolol",token);
        



        let tutToken:any = localStorage.getItem('tutor')
        console.log('tutok=',tutToken);
        
        if(tutToken) 
        {
            console.log('okay tokn');   
            tutToken = JSON.parse(tutToken);
            tutToken = tutToken.token
        }
        // tutToken = tutToken.token
        
        // if(token) {
          config.headers['token']=token
        //   config.headers['studToken']=studToken
          config.headers['tutToken']=tutToken
        //   console.log('config.headers=',config.headers['tutToken']);
          
        // } 


        let studToken:any = localStorage.getItem('student')
        console.log('studTok=',studToken);
        
        if(studToken){
            console.log('okay stud token');
            studToken = JSON.parse(studToken);
            studToken = studToken.token
            
        }
        config.headers['studToken']=studToken

        return config
    },
    (error)=>{
        return Promise.reject(error)
    }  
)