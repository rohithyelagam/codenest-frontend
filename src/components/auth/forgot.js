import React, { useState } from "react";
import axios from "axios";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [email_err,setEmail_err] = useState(null);
  const [valid,setValid] = useState(false);

  const navigator = useNavigate();

  const handleerr=()=>{
    if(email==""){
        setEmail_err("Email adress is invalid");
        return false;
    }else{
      var n = email.length;
      var d=0;
      for(var i=0;i<n;i++){
        if(d==0&&email[i]=='@'){
          d=1;
        }else if(d==1&&email[i]=='.'){
          d=2;
        }
      }
      if(d!=2){
        setEmail_err("Email adress is invalid");
        return false;
      }
    }
    return true;
  }

  const closeerr=()=>{
    setEmail_err(null);
  }

  const handleSubmit2 = ()=>{
    if(handleerr()){
      axios.post('http://localhost:4000/codenest/auth/v1/forgot', {
        email:email
      }).then((resp)=>{
        setValid(true);
        setTimeout(()=>navigator("/login"),3000);
      }).catch((err)=>{
        setEmail_err("Email Addres doesn't exists!");
      })
    }
  }


  return (
   
    <div className="login">
      <div className="login-wrapper">
        <div className="login-title">Forgot Password</div>
        <div className="forgot-des">
        {(!valid) ? (
            <p>Enter your email address</p>
          ) : (
            <div></div>
          )}
            
        </div>
        <div >
          <div className="login-form">

          {(valid) ? (
            <div className="sucessmsg">Password Sent to Email</div>
          ) : (
            <div></div>
          )}
            
            <div className="email">
             <input
                type="text"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                onClick={closeerr}
                placeholder="email"
              />
            </div>

            {(email_err)?(<div className="otperr">{email_err}</div>):(<div></div>)}
              
            <div className="submit">
              <button className="recover-pswd" onClick={handleSubmit2}>Recover Password</button>
            </div>

          </div>
        </div>
        <div className="login-bottom">
          <div className="forgot-password">
           Back to{" "}
            <a onClick={()=>navigator("/login")} className="forgot-link">
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
