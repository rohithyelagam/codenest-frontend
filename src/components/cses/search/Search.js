import { useCallback, useState } from "react"
import Problem from "./Problem";
import codenest from "../../../services/codenest";
import { debounce } from "lodash";
import "../../../styles/search.css"

export default function Search(){

    const [problems,setProblems] = useState([]);

    const searchText = async (s)=>{
        if(s!=""){
            const resp = await codenest.post('http://localhost:4000/codenest/cses/search',{problem:s},{});
            if(resp.status == 200){
                setProblems(resp.data.message);
            }
        }
    }

    const debouncedSearch = useCallback(
        debounce((term) => searchText(term), 200),
        []
      );

    return (
        <div className="search">
            <div className="title2">Search any CSES Problem</div>
            <div className="search-bar">
                <input
                    type="text"
                    onChange={(e)=>debouncedSearch(e.target.value)}
                />
            </div>
            <div className="problems-container flex-col">
                {problems.map(p=>(
                    <div key={p.link}><Problem problem={p}/></div>
                ))}
            </div>
        </div>
    )
}