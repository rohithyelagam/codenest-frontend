import React, { useState,useEffect } from 'react';
import {useSelector} from 'react-redux';
import Login from "./components/login";
import Loggedin from "./components/loggedin";
import Signup from "./components/signup";
import Forgot from "./components/forgot";
import './App.css';
import { useDispatch } from 'react-redux';
import { login } from './redux/actions';

function App(){

  var isLoggedin = useSelector((state)=>state.isLoggedin);
  
  var onSignup = useSelector((state)=> state.onSignup);
  var forgot = useSelector((state)=>state.forgot);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const fn = localStorage.getItem("firstName");
    const ln = localStorage.getItem("lastName");
    const em = localStorage.getItem("email");
    const ps = localStorage.getItem("password");
    if(loggedInUser){
      isLoggedin=loggedInUser;
      dispatch(login(fn,ln,em,ps));
    }
    
  }, [])

    return (
      <div className="App">
        {(forgot)?(
            <Forgot/>
        ):(
          <div>
            {(isLoggedin)?(
            <div className="logged-in">
              {(onSignup === true)?(
                <div><Signup/></div>
              ):(
                <div><Loggedin isLoggedin={isLoggedin} /></div>
              )}
            </div>
          ):(
            <div className="login">
              <Login isLoggedin={isLoggedin}/>
            </div>
          )}
           </div>
        )}
         
      </div>
    );
}

export default App;