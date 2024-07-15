import React, { useEffect } from "react";
import { getCokkie } from "../utils/common";
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import axios from "axios";
import Search from "./cses/search/Search";
import Coderunner from "./cses/coderunner/coderunner";
import Submissions from "./cses/submissions/submissions";
import codenest from "../services/codenest";

export default function Home() {
    const navigate = useNavigate();

    const checkLoggedIn = async () => {
        const token = await getCokkie("token");

        if (!token) {
            navigate('/login');
            return;
        }

        axios.post('http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/auth/v1/validateToken', { token })
            .then((resp) => {
                if (!resp.data.message) {
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.log(err.message);
                navigate('/login');
            });
    };

    useEffect(() => {
        checkLoggedIn();
    }, []);

    const handleLogout = async () =>{
        const email = await getCokkie("email");
        const resp = await codenest.post("http://ec2-43-204-100-120.ap-south-1.compute.amazonaws.com:4000/codenest/auth/v1/logout",{email:email},{});
        if(resp!=null && resp.status == 200){
            navigate("/login");
        }
    }

    

    return (
        <div className="main">
            <div className="header">
                <div className="head-left title">CodeNest</div>
                <div className="head-right">
                    <Link to={``} className="link">Problems</Link>
                    <Link to={`submissions`} className="link">Submissions</Link>
                    <div>
                        <button type="submit" className="button1" onClick={()=>handleLogout()}>&#x23FB;</button>
                    </div>
                </div>
            </div>
            <Routes>
                <Route path='' element={<Search />} />
                <Route path='execute' element={<Coderunner />} />
                <Route path='submissions' element={<Submissions />} />
            </Routes>
        </div>
    );
}
