import {createBrowserRouter} from "react-router-dom";

import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/auth/login';
import SignUp from './components/auth/signup';
import Forgot from './components/auth/forgot';
import OTP from './components/auth/otp';
import Cses from "../src/components/cses/cses";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
        children:[
            {path:"/cses",element:<Cses/>}
        ]
    },
    { path:"/login",element:<Login/>},
    { path:"/signup",element:<SignUp/>},
    { path:"/forgot",element:<Forgot/>},
    { path:"/otp",element:<OTP/>},
    { path:"*",element:<NotFound/>},

])

module.exports = {router};