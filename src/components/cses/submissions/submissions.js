import { useEffect, useState } from "react"
import { getCokkie } from "../../../utils/common";
import codenest from "../../../services/codenest";

export default function Submissions(){

    const [sub,setSub] = useState([]);

    const getSubmissions = async ()=>{
        const userId = await getCokkie("email");

        const resp = await codenest.post('http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/cses/getSubmissions',{userId:userId},{});
    
        if(resp!=null && resp.status == 200){
            setSub(resp.data.message);
        }
    }

    useEffect(()=>{
        getSubmissions();
    },[])

    return (
        <div>
            <div>Submissions</div>
            <br/>
            {sub.map((e)=>{
                return (
                    <div key={e.id} style={{"border":"1px solid black","margin":"5px","cursor":"pointer"}}>
                        <div>{e.problemId}</div>
                        <div>{e.lang}</div>
                        <div>{JSON.stringify(e.result)}</div>
                        <div>{e.code    }</div>
                    </div>
                )
            })}
        </div>
    )
}