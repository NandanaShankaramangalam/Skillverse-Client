import axios from "axios";
const BASE_URL = 'http://localhost:3001';
export const api =  axios.create({
    baseURL : BASE_URL
})

api.interceptors.request.use(
    (config)=>{
        let token=localStorage.getItem('admin')
        if(token) {
          config.headers['token']=token
        }  
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }  
)