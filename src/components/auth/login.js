import React, { useState } from "react";
import { LinearProgress } from '@mui/material';
import axios from "axios";
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import { addCokkie, removeCokkie } from "../../utils/common";

function Login() {

  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();

  const handlesubmit = async () => {

    setLoading(true);

    let data = {
      email: email,
      password: password
    }

    try {
      const res = await axios.post('https://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/auth/v1/login', data);
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
      console.log("invalid credidentials!");
    }

  }


  const handlesignup = () => {
    navigator("/signup");
  }
  const handleforgot = () => {
    navigator("/forgot");
  }

  return (

    <div className="login">
      {(loading) ? (
        <div className="loading-login">
          <LinearProgress />
        </div>
      ) : (
        <div className="login-wrapper" onClick={() => setInvalid(false)}>

          <div className="login-title">CODENEST</div>

            <div className="login-form" >

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
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  autoComplete="off"
                />
              </div>

              <div className="submit">
                <button type="submit" onClick={handlesubmit} >Log in</button>
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
      )}


    </div>

  );
}

export default Login;
