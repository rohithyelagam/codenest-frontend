import React, { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { useState } from "react";

    export default function Code({trigger,sendCode}){

    const [code,setCode] = useState("");
    const [lang,setLang] = useState("CPP");
    const [theme,setTheme] = useState("light");

    const handleChange = (e)=>{
        setCode(e);
    }

    useEffect(()=>{
        sendCode({code:code,lang:lang});
    },[trigger])
    
    return (
        <CodeMirror
        onChange={(e)=>handleChange(e)}
        height="700px"
        theme={theme}
        />
    )
}