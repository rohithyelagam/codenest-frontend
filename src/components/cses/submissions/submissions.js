import { useEffect, useState } from "react"
import { getCokkie } from "../../../utils/common";
import codenest from "../../../services/codenest";
import "../../../styles/submission.css"
import CodeMirror from "@uiw/react-codemirror";


export default function Submissions(){

    const [sub,setSub] = useState([]);
    const [detail,setDetail] = useState();

    const getSubmissions = async ()=>{
        const userId = await getCokkie("email");

        const resp = await codenest.post('http://localhost:4000/codenest/cses/getSubmissions',{userId:userId},{});
    
        if(resp!=null && resp.status == 200){
            resp.data.message.sort((a,b)=>{
                let dateA = new Date(a.timeStamp);
                let dateB = new Date(b.timeStamp);
                return dateB - dateA;
            })
            setSub(resp.data.message);
        }

        
    }

    useEffect(()=>{
        getSubmissions();
    },[])

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
    
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear(); 
        const hours = date.getHours().toString().padStart(2, '0'); 
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day}:${month}:${year} ${hours}:${minutes}`;
      }

      const getColor = (st)=>{
        switch(st){
            case "AC":
                return "rgba(37, 232, 23, 0.592)";
            
            case "CMP_ERR":
                return "rgba(0, 55, 255, 0.543)";
            case "RUN_ERR":
                return "rgba(0, 140, 255, 0.543)";
            case "TLE_ERR":
                return "rgba(255, 0, 132, 0.721)";
            case "WA_ERR":
                return "rgba(255, 0, 0, 0.721)";
            default:
                return "inherint"
        }
      }

    return (
        <div className="flex-col">
            <div className="sub-header">Submissions</div>
            <div className="sub-container">
                <div className="sub-list">
                    <div className="sub-single-head">
                        <div className="ph" style={{width:"80px"}}>ID</div>
                        <div className="ph" style={{width:"320px"}}>Name</div>
                        <div className="ph" style={{width:"120px"}}>Status</div>
                        <div className="ph" style={{width:"100px"}}>Language</div>
                        <div className="ph" style={{width:"160px"}}>Time</div>
                    </div>
                {sub.map((e)=>{
                    return (
                        <div key={e.id} onClick={()=>setDetail(e)} className="sub-single">
                            <div className="pr" style={{width:"80px"}}>{e.problemId}</div>
                            <div className="pr" style={{width:"320px"}}>{e.problemName}</div>
                            <div className="pr" style={{width:"120px",backgroundColor:getColor(e.result.code),borderRadius:"4px"}}>{e.result.code}</div>
                            <div className="pr" style={{width:"100px"}}>{e.lang}</div>
                            <div className="pr" style={{width:"160px"}}>{formatTimestamp(e.timeStamp)}</div>
                        </div>
                    )
                })}
                </div>
                <div className="overlay" hidden={detail==null}>
                    <div className="centered-content">
                        <div className="sub-single-detail">
                            <div className="pr" style={{width:"80px"}}>{detail?.problemId}</div>
                            <div className="pr" style={{width:"320px"}}>{detail?.problemName}</div>
                            <div className="pr" style={{width:"120px",backgroundColor:getColor(detail?.result.code),borderRadius:"4px"}}>{detail?.result.code}</div>
                            <div className="pr" style={{width:"100px"}}>{detail?.lang}</div>
                            <div className="pr" style={{width:"160px"}}>{formatTimestamp(detail?.timeStamp)}</div>
                            <button onClick={()=>setDetail()}>close</button>
                        </div>
                    <CodeMirror
                    value={(detail!=null && detail.code!=null)?detail.code:""}
                    editable={false}
                    readOnly={true}
                    theme={"dark"}
                    height="700px"
                    width="800px"
                    />
                    <div className="detail-summary">
                        {detail?.result.output}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}