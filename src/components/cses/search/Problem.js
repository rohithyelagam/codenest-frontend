import { useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Problem(props){

    const [prob,setProb] = useState(props.problem);

    const navigator = useNavigate();

    const handleProblem = (e)=>{
        navigator(`/execute?id=${prob.link.substr(17)}&name=${prob.name}`);
    }

    return (
        <div className="Problem" id={prob.link} onClick={handleProblem}>
                <div className="left">
                    <div className="problem-title">
                        {prob.name}
                    </div>
                    
                </div>
                <div className="right">
                <div className="category">
                    {prob.category}
                </div>
                <div className="submissions">
                    {prob.detail}
                </div>
                </div>
        </div>
    )
}