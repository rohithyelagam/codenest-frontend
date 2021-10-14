import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { closeSignup, login } from "../redux/actions";
import axios from "axios";
import "./signup.css";
function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_err,setFirst_err] = useState("none");
  const [email_err,setEmail_err] = useState("none");
  const [pswd_err,setPswd_err] = useState("none");


  const dispatch = useDispatch();

  const handlelogin = () => {
      dispatch(closeSignup());
  };

  const close_errs = ()=>{
      setFirst_err("none");
      setEmail_err("none");
      setPswd_err("none");
  }

  const handle_all_errors = ()=>{
    var dec=0;
    if(firstName===""){
      setFirst_err("1px solid #f81d1d");
      dec=1;
    }
    if(email===""){
      setEmail_err("1px solid #f81d1d");
      dec=1;
    }else{
      var n=email.length;
      var d=0;
      for(var i=0;i<n;i++){
          if(email[i]==='@'){
            d=1;
          }
          if(d==1 && email[i]==='.'){
            d=2;
          }
      }
      if(d!=2){
        setPswd_err("email format is not accepted");
        dec=1;
      }
    }
    if(password === ""){
      setPswd_err("1px solid #f81d1d");
      dec=1;
    }
    
    if(dec===1)return false;
      return true;
  }

  const handleSubmit = () =>{
    if(handle_all_errors()){
      axios.post('http://localhost:4000/new/user',{
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
      }).then((res)=>{
        if(res.data){
          close_errs();
        localStorage.setItem('user',"true"); 
        localStorage.setItem('firstName',res.data.firstName);
        localStorage.setItem('lastName',res.data.lastName);
        localStorage.setItem('email',email);
        localStorage.setItem('password',password);
        dispatch(login(firstName,lastName,email,password));
        }else{
          setEmail_err("1.2px solid #f81d1d")
          console.log("user exists already");
        }
        
      })
    }
    
      // dispatch(login());
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
      <div className="signup-wrapper" >
        <div className="login-title">Sign Up</div>

        <div >
          <div className="login-form" >
            <div className="signup-names">
                <div className="signup-firstName">

                <input
               style={{border:first_err}}
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                placeholder="first name"
                onClick={close_errs}
              />
              {(first_err!="none")?(
                <div className="err">first name canot be empty</div>
              ):(
                <div></div>
              )}
                </div>
                <div className="signup-lastName" >
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
             style={{border:email_err}}
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="email"
                onClick={close_errs}
              />
            </div>
            {(email_err === "none")?(
              <div></div>
            ):(
              <div>{(email_err[1]==='.')?(
              <div className="err">email address is already in use</div>
              ):(
              <div className="err">email address is invalid</div>
              )}</div>
              
            )}
            
            <div className="signup-password">
              <input
              style={{border:pswd_err}}
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="password"
                onClick={close_errs}
              />
            </div>
              {(pswd_err==="none")?(
                <div></div>
              ):(
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
