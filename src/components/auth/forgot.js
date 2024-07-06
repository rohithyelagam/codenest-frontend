import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {closeForgot} from "../../redux/actions";
import {LinearProgress} from '@mui/material';
import axios from "axios";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [des,setDes] = useState("none");
  const [sotp,setSotp] = useState();
  const [err,setErr] = useState("none");
  const [email_err,setEmail_err] = useState("none");
  const [pswd,setPswd] = useState("");

  const dispatch = useDispatch();

  const handleerr=()=>{
    if(email==""){
        setEmail_err("true");
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
        setEmail_err("true");
        return false;
      }
    }
    return true;
  }

  const closeerr=()=>{
    setDes("none");
    setErr("none");
    setOtp();
    setSotp();
    setPswd("");
    setEmail_err("none");
  }

  const closeforgot = ()=>{
    dispatch(closeForgot());
  }
  const handleSubmit = () => {
    if(handleerr()){
      setDes("loading")
      axios.post('https://spark-portal-backend.herokuapp.com/forgot/user',{
        email:email
      }).then((res)=>{
        console.log(res.data);
        setSotp(res.data.otp);
        setDes("sucess");
        // console.log(res.data.OTP);
      })
      // closeforgot();
    }
};

  const handleSubmit2 = ()=>{
      console.log(sotp);
      console.log(otp);
    if(sotp != otp){
      setErr("wrong");
    }else{
      axios.post('https://spark-portal-backend.herokuapp.com/get/pswd',{
        email:email
      }).then((res)=>{
        setPswd(res.data);
        setErr("correct");
      })
    }
  }

  const handleChange = (e) => {
    if(e.target.name=="email"){
      setEmail(e.target.value);
    }else{
      setOtp(e.target.value);
    }
    
  };


  return (
   
    <div className="login">
      <div className="login-wrapper">
        <div className="login-title">Forgot Password</div>
        <div className="forgot-des">
            <p>Enter your email address</p>
        </div>


        <div >
          <div className="login-form">
            
            <div className="email">
             <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                onClick={closeerr}
                placeholder="email"
              />
            </div>
            {(email_err==="true")?(<div className="otperr">Email adress is invalid</div>):(<div></div>)}
            {(des=="loading")?(<div className="loading"><LinearProgress/></div>):(<div></div>)}
            {(des=="sucess")?(

              <div className="otp">
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleChange}
                placeholder="OTP"
              />

            </div>
            ):(
              <div></div>
            )}
            {(err==="correct")?(<div className="sucess">Password: {pswd}</div>):(<div></div>)}
            {(err==="wrong")?(<div className="otperr">OTP desen't match</div>):(<div></div>)}
              
            <div className="submit">
              {(des==="sucess")?(
              <button className="recover-pswd" onClick={handleSubmit2}>Recover Password</button>
              ):(
              <button className="recover-pswd" onClick={handleSubmit}>Get OTP</button>
              )}

            </div>

          </div>

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
