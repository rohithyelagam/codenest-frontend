import React from 'react';
import {useSelector} from 'react-redux';
import Login from "./components/login";
import Loggedin from "./components/loggedin";
import Signup from "./components/signup";
import Forgot from "./components/forgot";

import './App.css';

function App(){

  const isLoggedin = useSelector((state)=>state.isLoggedin);
  const onSignup = useSelector((state)=> state.onSignup);
  const forgot = useSelector((state)=>state.forgot);

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
                <div><Loggedin isLoggedin={isLoggedin}/></div>
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