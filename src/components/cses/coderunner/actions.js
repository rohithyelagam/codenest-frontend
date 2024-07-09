import { useEffect, useState } from "react";
import codenest from "../../../services/codenest";
import { getCokkie } from "../../../utils/common";

export default function Actions(props){

    const [loading,setLoading] = useState(null);
    const [input,setInput] = useState("");
    const [output,setOutput] = useState("");
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
        const user = await getCokkie("email");
        let data = {
            userId: user,
            code:props.tempCode,
            lang:props.tempLang,
            input:input
        }

        // console.log("run",data);

        const resp = await codenest.post('http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/cses/runCode',data,{});
    
        if(resp!=null && resp.status == 200){
            setOutput(JSON.stringify(resp.data));
        }
        setLoading(null);
    }

    const submitCodeApi = async () =>{

        const user = await getCokkie("email");

        let data = {
            userId: user,
            problemId:props.problemId,
            code:props.tempCode,
            lang:props.tempLang
        }

        console.log("submit",data);

        const resp = await codenest.post('http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/cses/submitProblem',data,{});

        console.log(resp);
    
        if(resp!=null && resp.status == 200){
            setOutput(JSON.stringify(resp.data));
        }
        setLoading(null);
    }

    useEffect(()=>{
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

                    <input
                        type="text"
                        name="input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="input"
                    />
                    <div>
                        {output};
                    </div>
                </div>
            )}
            
        </div>
    )
}