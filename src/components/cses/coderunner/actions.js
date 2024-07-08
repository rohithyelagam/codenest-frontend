import { useEffect, useState } from "react";
import codenest from "../../../services/codenest";
import { getCokkie } from "../../../utils/common";

export default function Actions(props){

    const [loading,setLoading] = useState(null);
    const [flg,setFlg] = useState(false);
    const [input,setInput] = useState("");
;
    const handleRun = ()=>{
        setLoading("run");
        props.sendRun();
    }

    const handleSubmit = ()=>{
        setLoading("submit");
        props.sendRun();
    }

    const runCodeApi = async ()=>{
        let data = {
            userId: await getCokkie("email"),
            code:props.tempCode,
            lang:props.tempLang,
            input:input
        }

        console.log("run",data);

        // const resp = await codenest.post('http://localhost:4000/codenest/cses/runCode',data,{});
    
        // if(resp!=null && resp.status == 200){
        //     console.log(resp);
        // }
    }

    const submitCodeApi = async () =>{

        let data = {
            userId: await getCokkie("email"),
            problemId:props.problemId,
            code:props.tempCode,
            lang:props.tempLang
        }

        console.log("submit",data);

        // const resp = await codenest.post('http://localhost:4000/codenest/cses/submitProblem',data,{});
    
        // if(resp!=null && resp.status == 200){
        //     console.log(resp);
        // }
    }

    useEffect(()=>{
        console.log(props.tempCode!="");
        if(props.tempCode!=""){
            var type = loading;
            setLoading(null);
            if(type == "run"){
                runCodeApi();
            }else{
                submitCodeApi();
            }
        }
    },[props.tempCode,props.tenmpLang])

    useEffect(()=>{

        setLoading(null);
        if(props.sameTrigger!=""){
            setFlg(true);
            setTimeout(()=>setFlg(false),2000);
        }
    },[props.sameTrigger])

    return (
        <div className="actions">

            {(loading) ? (
                <div>Loading</div>
                ) : (
                <div>
                    <div>
                        <button onClick={handleRun}>Run</button>
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Sumit</button>
                    </div>

                    {(flg)?(
                        <div>Same Code Executed.</div>
                    ):(
                        <div>
                            <input
                            type="text"
                            onChange={(e)=>setInput(e.target.value)}
                            />
                        </div>
                    )}
                </div>
            )}
            
        </div>
    )
}