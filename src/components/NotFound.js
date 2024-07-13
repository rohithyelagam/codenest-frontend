import React from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound(){

    const navigator = useNavigate();

    const handleHome = ()=>{
        navigator("/");
    }

    return(
    <div class="error-container">
        <div class="error-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Oops! The page you are looking for could not be found.</p>
          <a onClick={handleHome} className="link">Go to Homepage</a>
        </div>
      </div>
    )
}