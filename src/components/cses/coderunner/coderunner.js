import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import codenest from "../../../services/codenest";
import "../../../styles/coderunner.css";
import "../../../styles/common.css";
import Code from "./code";
import Actions from "./actions";
import { LinearProgress } from "@mui/material";


export default function Coderunner(){

    const [searchParams] = useSearchParams();
    const [problemId,setProblemId] = useState();
    const [problemHtml,setProblemHtml] = useState();
    const [tempCode,setTempCode] = useState();
    const [tempLang,setTempLang] = useState("CPP");
    const [tempTheme,setTempTheme] = useState("dark");
    const [trigger,setTrigger] = useState(false);
    const [sametrigger,setSametrigger] = useState(false);
    const [loading ,setLoading] = useState(true);
    const [problemName,setProblemName] = useState();
    const [langFlg,setLangFlg] = useState(false);
    const [allLang,setAllLang] = useState(["CPP","Java","Python"]);
    const [themeFlg,setThemeFlg] = useState(false);
    const [allTheme,setAllTheme] = useState(["light","dark"]);
    const [height,setHeight] = useState("650px");

    const getProblem = async (id,name)=>{
        setProblemId(id);
        setProblemName(name);
        const resp = await codenest.post('http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/cses/getProblem',{problemId:id},{});
        
        if(resp!=null && resp.status == 200){
            setProblemHtml(resp.data);
        }
        setLoading(false);
    }

    useEffect(()=>{
        getProblem(searchParams.get("id"),searchParams.get("name"));
    },[])

    const receiveCode = (code)=>{
        if(code === tempCode ){
            setSametrigger(!sametrigger);
        }else{
            setTempCode(code);
        }
    }

    const chngHeight = (flg)=>{
    
        if(flg){
            setHeight("750px");
        }else{
            setHeight("750px");
        }
    }

    const tiggerRunCode = ()=>{
        setTrigger(!trigger);
    }

    const handleLang = ()=>{
        setLangFlg(true);
    }

    const handleLangClose=(e)=>{
        setLangFlg(false);
        setTempLang(e);
    }

    const handleTheme = ()=>{
        setThemeFlg(true);
    }

    const handleThemeClose=(e)=>{
        setThemeFlg(false);
        setTempTheme(e);
    }

    return (
        <div>
            {(loading)?(
                <div className="loading-login"><LinearProgress /></div>
            ):(
                <div className="runner">
                    <div className="runner-left">
                        <div className="runner-contianer">
                            <div className="problem-title">
                                {problemName}
                            </div>
                            <div className="problem-content" dangerouslySetInnerHTML={{__html:problemHtml}}>
                            </div>
                        </div>
                    </div>
                    <div className="runner-right">
                        <div className="runner-contianer">
                            <div className="options">
                                <div className="lang">
                                    <button onClick={handleLang}>{tempLang}</button>
                                    <div className="langDropDown" hidden={!langFlg}>
                                        {allLang.map((lang)=>(
                                            <div className="singleLang" onClick={()=>handleLangClose(lang)}>{lang}</div>
                                        ))}
                                    </div>
                                </div>
                                <div className="lang">
                                    <button onClick={handleTheme}>{tempTheme}</button>
                                    <div className="langDropDown" hidden={!themeFlg}>
                                        {allTheme.map((lang)=>(
                                            <div className="singleLang" onClick={()=>handleThemeClose(lang)}>{lang}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="code">
                                <Code tempLang={tempLang} trigger={trigger} tempTheme={tempTheme} height={height} sendCode={receiveCode} />
                            </div>
                            <div className="actions">
                                <Actions problemId={problemId} tempCode={tempCode} tempLang={tempLang} sametrigger={sametrigger} sendRun={tiggerRunCode} changeHeight={chngHeight}/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
