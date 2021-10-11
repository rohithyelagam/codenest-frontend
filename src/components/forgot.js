import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {closeForgot} from "../redux/actions";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();


  const closeforgot = ()=>{
    dispatch(closeForgot());
  }
  const handleSubmit = () => {
    closeforgot();
};

  const handleChange = (e) => {
    setEmail(e.target.value);
  };


  return (
   
    <div className="login">
      <div className="login-wrapper">
        <div className="login-title">Forgot Password</div>
        <div className="forgot-des">
            <p>Enter your email address</p>
        </div>
        <div >
          <form className="login-form" onSubmit={handleSubmit}>
            
            <div className="email">
             <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="email"
              />
            </div>

            <div className="submit">
            <input  type="submit" value="Recover Password" />
            </div>

          </form>
           
          </div>
          <div className="login-bottom">
          <div className="forgot-password">
           Back to{" "}
            <a onClick={closeforgot} className="forgot-link">
             Log in
            </a>
            ?
          </div>
          
        </div>
        </div>
      </div>
    
  );
}

export default Login;
