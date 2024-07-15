import React, { useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark, vscodeLight } from "@uiw/codemirror-theme-vscode";
import { useState } from "react";

    export default function Code({trigger,sendCode,tempLang,height,tempTheme}){

    const [code,setCode] = useState("");
    const [lang,setLang] = useState(tempLang);
    const [color,setColor] = useState();
    const [theme,setTheme] = useState(tempTheme);

    const handleChange = (e)=>{
        setCode(e);
    }

    useEffect(()=>{
        sendCode(code);
    },[trigger])

    useEffect(()=>{
        setTheme(tempTheme);
        if(tempTheme == "light"){
            setColor("black");
        }else{
            setColor("white");
        }
    },[tempTheme])

    useEffect(()=>{
        setLang(tempLang);
    },[tempLang])
    
    return (
        <CodeMirror
        onChange={(e)=>handleChange(e)}
        height={height}
        theme={theme}
        style={{color:color}}
        />
    )
}