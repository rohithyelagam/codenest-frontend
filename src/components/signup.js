import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeSignup, login, logout } from "../redux/actions";
import "./login.css";
import "./signup.css";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const dispatch = useDispatch();

  const handlelogin = () => {
      dispatch(closeSignup());
  };
  const handleSubmit = () =>{
      dispatch(login());
  }

  const handleChange = (e) => {
    var dec = e.target.name;
    var tar = e.target.value;
    if(dec==="firstName"){
        setFirstName(tar);
    }else if(dec==="lastName"){
        setLastName(tar);
    }else if(dec==="email"){
        setEmail(tar);
    }else if(dec==="password"){
        setPassword(tar);
    }
  };
 

  return (
    <div className="signup">
      <div className="signup-wrapper">
        <div className="login-title">Sign Up</div>

        <div >
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="names">
                <div className="firstName">
                <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                placeholder="first name"
              />
                </div>
                <div className="lastName" >
                <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                placeholder="last name"
              />
                </div>
            </div>
            <div className="signup-email">
             <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="email"
              />
            </div>

            <div className="signup-password">
              <input
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="password"
              />
            </div>

            <div className="signup-submit">
            <input  type="submit" value="Create account" />
            </div>

          </form>
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
