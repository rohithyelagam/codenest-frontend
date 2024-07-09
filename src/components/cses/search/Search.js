import { useCallback, useState } from "react"
import Problem from "./Problem";
import codenest from "../../../services/codenest";
import { debounce } from "lodash";


export default function Search(){

    const [problems,setProblems] = useState([]);

    const searchText = async (s)=>{
        if(s!=""){
            const resp = await codenest.post('http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/cses/search',{problem:s},{});
            if(resp.status == 200){
                setProblems(resp.data.message);
            }
        }
    }

    const debouncedSearch = useCallback(
        debounce((term) => searchText(term), 300),
        []
      );

    return (
        <div className="search">
            <div className="title">Search any CSES Problem</div>
            <div className="search-bar">
                <input
                    type="text"
                    onChange={(e)=>debouncedSearch(e.target.value)}
                />
            </div>
            <div>{searchText}</div>
            <div className="problems-container">
                <div className="problems-list">
                    {problems.map(p=>(
                        <div key={p.link}><Problem problem={p}/></div>
                    ))}
                </div>
            </div>
        </div>
    )
}