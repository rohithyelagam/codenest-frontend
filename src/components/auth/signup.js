import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {addCokkie} from "../../utils/common";
import "../../styles/signup.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Signup() {

  const navigator = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_err, setFirst_err] = useState("none");
  const [email_err, setEmail_err] = useState("none");
  const [pswd_err, setPswd_err] = useState("none");
  const [showPswd,setShowPswd] = useState("text");

  const changePswd = ()=>{
    if(showPswd == "password"){
      setShowPswd("text");
    }else{
      setShowPswd("password");
    }
  }

  const handlelogin = () => {
    navigator("/login");
  };

  const close_errs = () => {
    setFirst_err("none");
    setEmail_err("none");
    setPswd_err("none");
  }

  const handle_all_errors = () => {
    var dec = 0;
    if (username === "") {
      setFirst_err("1px solid #f81d1d");
      dec = 1;
    }
    if (email === "") {
      setEmail_err("Email Adress is Invalid");
      dec = 1;
    } else {
      var n = email.length;
      var d = 0;
      for (var i = 0; i < n; i++) {
        if (email[i] === '@') {
          d = 1;
        }
        if (d == 1 && email[i] === '.') {
          d = 2;
        }
      }
      if (d != 2) {
        setPswd_err("email format is not accepted");
        dec = 1;
      }
    }
    if (password === "") {
      setPswd_err("1px solid #f81d1d");
      dec = 1;
    }

    if (dec === 1) return false;
    return true;
  }

  const handleSubmit = () => {
    if (handle_all_errors()) {
        addCokkie("email",email);
        addCokkie("username",username);
        addCokkie("pswd",password);
        axios.post('http://ec2-43-204-148-135.ap-south-1.compute.amazonaws.com:4000/codenest/auth/v1/register', {
          username: username,
          email:email,
          password:password
        }).then((res) => {
          if (res.data) {
            console.log(res.data);
            navigator("/otp");
          } else {
            setEmail_err("user exists already")
            console.log("user exists already");
          }
        }).catch(err=>{
          setEmail_err("user exists already")
          console.log("user exists already");
        })
    }
  }

  const handleChange = (e) => {
    var dec = e.target.name;
    var tar = e.target.value;
    if (dec === "username") {
      setUsername(tar);
    }else if (dec === "email") {
      setEmail(tar);
    } else if (dec === "password") {
      setPassword(tar);
    }
  };


  return (
    <div className="signup">
      <div className="signup-wrapper" >
        <div className="login-title">Sign Up</div>

        <div>
          <div className="login-form" >
            <div className="signup-email">

                <input
                  style={{ border: first_err }}
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="username"
                  onClick={close_errs}
                />
                {(first_err != "none") ? (
                  <div className="err">first name canot be empty</div>
                ) : (
                  <div></div>
                )}
            </div>

            <div className="signup-email">
              <input
                style={{ border: (email_err=="none" || email_err==null)?"none":"1px solid #f81d1d" }}
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="email"
                onClick={close_errs}
              />
            </div>
            {(email_err === "none" || email_err==null) ? (
              <div></div>
            ) : (
                <div className="err">{email_err}</div>
            )}

            <div className="signup-password">
              <input
                style={{ border: pswd_err }}
                type={showPswd}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="password"
                onClick={close_errs}
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
            {(pswd_err === "none") ? (
              <div></div>
            ) : (
              <div className="err">password cannot be empty</div>
            )}
            <div className="signup-submit">
              <button onClick={handleSubmit}>Create account</button>
            </div>

          </div>
        </div>

        <div className="login-bottom">
          <div className="forgot-password">
            Already have an account?{" "}
            <a onClick={handlelogin} className="signup-link">
              Log in
            </a>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
