import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { logout,login } from "../../redux/actions";
import "./loggedin.css";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

function Login(props) {
  const [firstName,setFirstName] =  useState(useSelector((st)=>st.user.firstName));
  const [lastName,setLastName] =  useState(useSelector((st)=>st.user.lastName));
  const [email, setEmail] = useState(useSelector((st)=>st.user.email));
  const [password, setPassword] = useState(useSelector((st)=>st.user.password));

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };
  
  return (
    <div className="loggedin">
      <div className="wrapper">
        <div className="header">Spark Portal</div>
        <div className="photo">
          <AccountCircleRoundedIcon className="photo-icon"  sx={{ color: "#0091b9", fontSize: 100}}/></div>
        <div className="names">
        <div className="text">{firstName+" "+lastName}</div>
        </div>
        <div className="email">{email}</div>
        <div className="footer"><button onClick={handleLogout}>Log out</button></div>
      </div>
    </div>
  );
}

export default Login;
