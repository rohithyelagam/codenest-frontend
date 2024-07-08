import axios from 'axios';
import { getCokkie } from '../utils/common';

// const url = "http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest";
const url = "http://localhost:4000/codenest";

const post = async (endpoint,data,headers) => {
    const token = await getCokkie("token");
    headers["token"] = token;
    try{
        const response = await axios.post(endpoint,data,{
            headers:headers
        });
        return await sendResponse(response);
    }catch(err){
        return await sendResponse(null);
    }

}

const get = async (endpoint,headers) => {
    
}

const sendResponse = (data)=>{
    return new Promise(resolve => resolve(data));
}

const codenest = {post,get,sendResponse};

export default codenest;

