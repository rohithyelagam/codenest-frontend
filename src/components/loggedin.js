import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions";

function Login() {
    
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="loggedin">
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Login;
