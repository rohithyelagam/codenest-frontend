import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import codenest from "../../../services/codenest";

export default function Coderunner(props){

    const [searchParams] = useSearchParams();

    const [problemHtml,setProblemHtml] = useState();

    const getProblem = async (id)=>{
        const resp = await codenest.post('http://localhost:4000/codenest/cses/getProblem',{problemId:id},{});
        if(resp.status == 200){
            setProblemHtml(resp.data);
        }
    }

    useEffect(()=>{
        getProblem(searchParams.get("id"));
    },[])

    return (
        <div className="runner">
            <div className="runner-left" style={{"width":"50%"}}><div dangerouslySetInnerHTML={{__html:problemHtml}}></div>
            <div className="runner-right" style={{"width":"50%"}}>heelo</div>
        </div>
        
        </div>
    )
}