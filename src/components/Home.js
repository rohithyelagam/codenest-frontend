import React, { useEffect } from "react";
import { getCokkie, removeCokkie } from "../utils/common";
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import axios from "axios";
import NotFound from "./NotFound";
import Search from "./cses/search/Search";
import Coderunner from "./cses/coderunner/coderunner";
import Submissions from "./cses/submissions/submissions";

export default function Home() {
    const navigate = useNavigate();

    const checkLoggedIn = async () => {
        const token = await getCokkie("token");
        console.log("Auth Token : " + token);

        if (!token) {
            navigate('/login');
            return;
        }

        axios.post('http://localhost:4000/codenest/auth/v1/validateToken', { token })
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

    return (
        <div className="home">
            <div>
                <Link to={``}>Search</Link>
                <br />
                <Link to={`execute`}>Coderunner</Link>
                <br />
                <Link to={`submissions`}>Submissions</Link>
                <br />
            </div>

            Home

            <Routes>
                <Route path='' element={<Search />} />
                <Route path='execute' element={<Coderunner />} />
                <Route path='submissions' element={<Submissions />} />
            </Routes>
        </div>
    );
}
