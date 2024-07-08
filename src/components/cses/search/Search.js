import { useCallback, useState } from "react"
import Problem from "./Problem";
import codenest from "../../../services/codenest";
import { debounce } from "lodash";


export default function Search(){

    const [problems,setProblems] = useState([
        {
            name: "Weird Algorithm",
            category: "Introductory Problems",
            link: "/problemset/task/1068",
            detail: "103929 / 108832",
            score: 15
        },
        {
            name: "Programmers and Artists",
            category: "Additional Problems",
            link: "/problemset/task/2426",
            detail: "335 / 429",
            score: 8
        }
    ]);

    const searchText = async (s)=>{
        if(s!=""){
            console.log(s);
            const resp = await codenest.post('http://localhost:4000/codenest/cses/search',{problem:s},{});
            console.log("response : ",resp);
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