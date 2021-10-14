import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  login, openSignup, openForgot } from "../redux/actions";
import axios from "axios";
import "./login.css";

function Login() {
  const [invalid,setInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handlesubmit = ()=>{
    axios.post('https://spark-portal.herokuapp.com/login/user',{
      email:email,
      password:password
    }).then((res)=>{
      if(res.data){
       setInvalid(false);
        setEmail(res.data.email);
        setPassword(res.data.password);
        localStorage.setItem('user',"true"); 
        localStorage.setItem('firstName',res.data.firstName);
        localStorage.setItem('lastName',res.data.lastName);
        localStorage.setItem('email',email);
        localStorage.setItem('password',password);
        dispatch(login(res.data.firstName,res.data.lastName,res.data.email,res.data.password));
      }else{
        setInvalid(true);
        console.log("invalid credidentials!");
      }
        
    })
   
    
  }


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
      <div className="login-wrapper" onClick={()=>setInvalid(false)}>
        <div className="login-title">Spark Portal</div>

        <div >
          <div className="login-form" >
          
            {(invalid)?(
              <div className="invalidmsg">email or password is incorrect!</div>
            ):(
              <div></div>
            )}
            
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
            <button onClick={handlesubmit} >Log in</button>
            </div>

          </div>
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
