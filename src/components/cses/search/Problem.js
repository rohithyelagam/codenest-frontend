import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Problem(props){

    const [prob,setProb] = useState(props.problem);

    const navigator = useNavigate();

    const handleProblem = (e)=>{
        navigator(`/execute?id=${prob.link.substr(17)}`);
    }

    return (
        <div className="Problem">
            <div className="problem-contianer" id={prob.link} style={{"border":"1px solid black","margin":"5px","width":"500px","cursor":"pointer"}} onClick={handleProblem}>
                <div className="name"><h1>{prob.name}</h1></div>
                <div className="category">{prob.category}</div>
                <div className="submissions">{prob.detail}</div>
            </div>
        </div>
    )
}