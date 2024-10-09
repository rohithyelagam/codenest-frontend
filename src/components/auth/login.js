import React, { useEffect, useState } from "react";
import { LinearProgress } from '@mui/material';
import axios from "axios";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { addCokkie, removeCokkie, getCokkie } from "../../utils/common";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Login() {

  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPswd,setShowPswd] = useState("password");

  const navigator = useNavigate();

  const handlesubmit = async () => {

    setLoading(true);

    let data = {
      email: email,
      password: password
    }

    try {
      const res = await axios.post('http://ec2-43-204-148-135.ap-south-1.compute.amazonaws.com:4000/codenest/auth/v1/login', data);
      if (res.data) {
        setInvalid(false);
        setLoading(false);
        addCokkie("token",res.data.message);
        addCokkie("email",email);
        removeCokkie("pswd")
        removeCokkie("username");
        navigator("/");
      }
    } catch (err) {
      setInvalid(true);
      setLoading(false);
      setEmail("");
      setPassword("");
      console.log("invalid credidentials!");
    }

  }


  const handlesignup = () => {
    navigator("/signup");
  }
  const handleforgot = () => {
    navigator("/forgot");
  }

  const changePswd = ()=>{
    if(showPswd == "password"){
      setShowPswd("text");
    }else{
      setShowPswd("password");
    }
  }

  const checkLoggedIn = async () => {
    const token = await getCokkie("token");

    if (!token) {
        return;
    }

    axios.post('http://ec2-43-204-148-135.ap-south-1.compute.amazonaws.com:4000/codenest/auth/v1/validateToken', { token })
        .then((resp) => {
            if (resp.data.message) {
              navigator("/");
            }
        })
        .catch((err) => {
        });
  };

  useEffect(()=>{
    checkLoggedIn();
  },[])

  
  return (

    <div className="login">
      {(loading) ? (
        <div className="loading-login">
          <LinearProgress />
        </div>
      ) : (
        <div className="login-wrapper" onClick={() => setInvalid(false)}>

          <div className="login-title">CODENEST</div>

            <form className="login-form" >

              {(invalid) ? (
                <div className="invalidmsg">email or password is incorrect!</div>
              ) : (
                <div></div>
              )}

              <div className="email">
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"

                />
              </div>

              <div className="password">
                <input
                  type={showPswd}
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="password"
                  autoComplete="off"
                />
                {(showPswd == "text")?(
                  <div onClick={changePswd} className="pswdVisibility">
                    <VisibilityOffOutlinedIcon/>
                  </div>
                ):(
                  <div onClick={changePswd} className="pswdVisibility">
                    <VisibilityOutlinedIcon/>
                  </div>
                )}
              </div>

              <div className="submit">
                <button type="submit" onClick={handlesubmit} >Log in</button>
              </div>

            </form>
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
      )}


    </div>

  );
}

export default Login;
