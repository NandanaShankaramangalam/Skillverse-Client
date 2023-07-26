import axios from "axios";
const BASE_URL = 'http://localhost:3001';

export const api =  axios.create({
    baseURL : BASE_URL,
})

api.interceptors.request.use(
    (config)=>{
        let token=localStorage.getItem('admin')
        let studToken = localStorage.getItem('student')
        let tutToken = localStorage.getItem('tutor')
        // if(token) {
          config.headers['token']=token
          config.headers['studToken']=studToken
          config.headers['tutToken']=tutToken
          
        // } 
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }  
)