import { useState } from "react"


export default function Problem(props){

    const [prob,setProb] = useState(props.problem);

    return (
        <div className="Problem">
            {prob.name}<br/>
            {prob.category}<br/>
            {prob.link}<br/>
            {prob.detail}<br/>
            {prob.score}
        </div>
    )
}