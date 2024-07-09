import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import codenest from "../../../services/codenest";
import "../../../styles/coderunner.css";
import "../../../styles/common.css";
import Code from "./code";
import Actions from "./actions";

export default function Coderunner(){

    const [searchParams] = useSearchParams();
    const [problemId,setProblemId] = useState();
    const [problemHtml,setProblemHtml] = useState();
    const [tempCode,setTempCode] = useState();
    const [tempLang,setTempLang] = useState("CPP");
    const [trigger,setTrigger] = useState(false);
    const [sametrigger,setSametrigger] = useState(false);

    const getProblem = async (id)=>{
        setProblemId(id);
        const resp = await codenest.post('http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/cses/getProblem',{problemId:id},{});
        
        if(resp!=null && resp.status == 200){
            setProblemHtml(resp.data);
        }
    }

    useEffect(()=>{
        getProblem(searchParams.get("id"));
    },[])

    const receiveCode = (data)=>{
        if(data.code ===tempCode && data.lang ===tempLang){
            setSametrigger(!sametrigger);
        }else{
            setTempCode(data.code);
            setTempLang(data.lang);
        }
    }

    const tiggerRunCode = ()=>{
        setTrigger(!trigger);
    }

    return (
        <div className="runner flex-row">
            <div className="runner-left" style={{"width":"50%"}}><div dangerouslySetInnerHTML={{__html:problemHtml}}></div></div>
            <div className="runner-right" style={{"width":"50%"}}>
                <div className="options flex-row">
                    <div className="lang">{tempLang}</div>
                    <div className="theme">light</div>
                </div>
                <div className="code">
                    <Code trigger={trigger} sendCode={receiveCode}/>
                </div>
                <div className="actions">
                    <Actions problemId={problemId} tempCode={tempCode} tempLang={tempLang} sametrigger={sametrigger} sendRun={tiggerRunCode} />
                </div>
            </div>
        </div>
    )
}