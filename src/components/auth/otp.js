import { LinearProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { getCokkie, removeCokkie } from "../../utils/common";

export default function OTP(){

    const [invalid, setInvalid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username,setUsername] = useState()
    const [email, setEmail] = useState();
    const [pswd, setPswd] = useState();
    const [otp,setOtp] = useState();
    const [cnt,setCnt] = useState(15);
    const [valid,setValid] = useState(false);
    var intervalId = null;
    const otpRref = useRef(null);


  
    const navigator = useNavigate();
  
    const handlesubmit = async () => {

      setLoading(true);
  
      let data = {
        userId: email,
        otp: otp
      }
  
      try {
        const res = await axios.post('http://localhost:4000/codenest/auth/v1/validateOtp', data);
        if (res.data) {
          setInvalid(false);
          setLoading(false);
          setValid(true);
          removeCokkie("pswd");
          setTimeout(()=>navigator("/login"),1000);
          ;
        }
      } catch (err) {
        setInvalid(true);
        setLoading(false);
        console.log("invalid OTP!");
      }

    }

    const handleOtp = (e)=>{
      if(/^\d+$/.test(e.target.value)){
        setOtp(e.target.value);
      }else if(e.target.value == ""){
        setOtp(null);
      }
    }

    const handleResend = async () => {
      if(cnt==0){
        setCnt(15);
        countdown();
        console.log(username,email,pswd);
        await axios.post('http://localhost:4000/codenest/auth/v1/register', {
          username: username,
          email:email,
          password:pswd
        }).then((res) => {
          if (res.data) {
            console.log(res.data);
          } else {
            console.log("user exists already");
          }
        })
      }
    }

    const countdown = ()=>{
      const intervalId = setInterval(() => {
        setCnt((prevCnt)=>{
          if(prevCnt==0){
            clearInterval(intervalId);
            return 0;
          }
          return prevCnt-1;
        });
      }, 1000);
    }

    const getCredentials = () =>{
      getCokkie("username").then(e=>setUsername(e));
      getCokkie("email").then(e=>setEmail(e));
      getCokkie("pswd").then(e=>setPswd(e));
    }

    useEffect(()=>{
      otpRref.current.focus();
      countdown();
      getCredentials();
    },[])

    return (
  
      <div className="login">
        {(loading) ? (
          <div className="loading-login"><LinearProgress /></div>
        ) : (
          <div className="login-wrapper" onClick={() => setInvalid(false)}>
  
            <div className="login-title">OTP</div>
  
            <form>
              <div className="login-form" >
  
                {(invalid) ? (
                  <div className="invalidmsg">Inavlid OTP!</div>
                ) : (
                  <div></div>
                )}

                {(valid) ? (
                  <div className="sucessmsg">OTP Validated Sucessfully</div>
                ) : (
                  <div></div>
                )}

                <input
                required
                type="text"
                className="otp"
                maxLength="4"
                ref={otpRref}
                onChange={(e)=>handleOtp(e)}
                />
  
                <div className="submit">
                  <button type="submit" onClick={handlesubmit} >submit</button>
                </div>
  
              </div>
            </form>
            <div className="login-bottom">
              <div className="resend-otp">
                <a onClick={handleResend} className="forgot-link" id="resend_otp">
                <div>Resend OTP</div>{(cnt>0)?(<div> in {cnt}</div>):(<div></div>)}
                </a>
              </div>
  
              <div className="sign-up-bottom">
                <a onClick={()=>navigator("/login")} className="signup-link">
                Login
                </a>
                <a onClick={()=>navigator("/signup")} className="signup-link">
                SignUp
                </a>
              </div>
            </div>
          </div>
        )}
  
  
      </div>
  
    );

}