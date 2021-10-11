import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeSignup, login, openSignup, logout, openForgot } from "../redux/actions";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(login());
  };
  const handlesignup = () => {
    dispatch(openSignup());
  }
  const handleforgot = ()=>{
    dispatch(openForgot());
  }
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleChange2 = (e) => {
    setPassword(e.target.value);
  };

  return (
   
    <div className="login">
      <div className="login-wrapper">
        <div className="login-title">Spark Portal</div>

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

            <div className="password">
              <input
                type="text"
                name="password"
                value={password}
                onChange={handleChange2}
                placeholder="password"
              />
            </div>

            <div className="submit">
            <input  type="submit" value="Log in" />
            </div>

          </form>
        </div>

        <div className="login-bottom">
          <div className="forgot-password">
            Forgot{" "}
            <a onClick={handleforgot} className="forgot-link">
              Password
            </a>
            ?
          </div>
          
          <div className="sign-up">
            Don't have an account?{" "}
           
            <a onClick={handlesignup} className="signup-link">
              Sign up
            </a>
           
          </div>
        </div>
      </div>
     
    </div>
    
  );
}

export default Login;
