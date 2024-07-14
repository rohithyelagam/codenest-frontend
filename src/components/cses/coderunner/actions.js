import { useEffect, useState } from "react";
import codenest from "../../../services/codenest";
import { getCokkie } from "../../../utils/common";
import RunCodeIcon from '@mui/icons-material/Code';
import SendIcon  from "@mui/icons-material/Send";
import { LinearProgress } from "@mui/material";

export default function Actions(props){

    const [loading,setLoading] = useState(null);
    const [input,setInput] = useState("");
    const [output,setOutput] = useState("");
    const [status,setStatus] = useState("");
    const [resFlg,setResFlg] = useState(false);
;
    const handleRun = ()=>{
        setLoading("run");
        props.changeHeight(true);
        props.sendRun();
    }

    const handleSubmit = ()=>{
        setLoading("submit");
        props.changeHeight(true);
        props.sendRun();
    }

    const runCodeApi = async ()=>{
        const user = await getCokkie("email");
        let data = {
            userId: user,
            code:props.tempCode,
            lang:props.tempLang,
            input:input
        }

        const resp = await codenest.post('http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/cses/runCode',data,{});
    
        if(resp!=null && resp.status == 200){
            setOutput(resp.data.message.output);
            setStatus(resp.data.message.code);
            setResFlg(true);
        }
        
        setLoading(null);
    }

    const submitCodeApi = async () =>{

        const user = await getCokkie("email");

        let data = {
            userId: user,
            problemId:props.problemId,
            code:props.tempCode,
            lang:props.tempLang,
            problemName:props.problemName
        }

        const resp = await codenest.post('http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/cses/submitProblem',data,{});
    
        if(resp!=null && resp.status == 200){
            setOutput(resp.data.message.output);
            setResFlg(true);
        }
        
        setLoading(null);
    }

    useEffect(()=>{
        props.changeHeight(resFlg);
    },[resFlg]);

    useEffect(()=>{
        console.log("different trigger");
        var type = loading;
        if(props.tempCode!=undefined && props.tempCode!="" && props.tempLang!="" && props.tempLang!=undefined){
            var type = loading;
            if(type == "run"){
                runCodeApi();
            }else{
                submitCodeApi();
            }
        }else{
            setLoading(null);
        }
    },[props.tempCode,props.tenmpLang])

    useEffect(()=>{
        console.log("sametrigger");
        var type = loading;
        
        if(props.tempCode!="" && props.tempCode!=undefined){
            
            if(type == "run"){
                runCodeApi();
            }else{
                submitCodeApi();
            }   
        }else{
            setLoading(null);
        }
    },[props.sametrigger])

    return (
    <div className="actions">
       

        <div className="action-buttons">
            
            <textarea
            className="prob-input"
                type="text"
                name="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="input"
            />
                <button className="run-but" onClick={handleRun}><RunCodeIcon/> Run</button>
                <button className="submit-but" onClick={handleSubmit}><SendIcon/> Submit</button>
                <button className="direc-button" onClick={()=>setResFlg(!resFlg)}>
                    {(resFlg)?(<div>&darr;</div>):(<div> &uarr;</div>)}
                </button>
        </div>
        {(resFlg && !loading)?(
            <div className="output">
                <div className="stdout">stdout : {output}</div>
                <div className="out-card">
                    <div className="status">Status : {status}</div>
                    <div className="langueg">language : {props.tempLang}</div>
                </div>
            </div>
        ):(
            <div>
                {(loading)?(
                     <div className="loading-login2">
                     <LinearProgress />
                   </div>
                ):(
                    <div></div>
                )}
            </div>
        )}
    </div>
    )
}


