import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/auth/login';
import SignUp from './components/auth/signup';
import Forgot from './components/auth/forgot';
import OTP from './components/auth/otp';
import Search from './components/cses/search/Search';
import Coderunner from './components/cses/coderunner/coderunner';
import Submissions from './components/cses/submissions/submissions';

function App(){

    return (
      <div className="App" style={{color:"white"}}>
        {/* <Routes>
          <Route path='/' element={<Home/>}>
            <Route path='' element={<Search/>}/>
            <Route path='execute' element={<Coderunner />} />
            <Route path='submissions' element={<Submissions />} />
          </Route>
          <Route path='login' element={<Login/>}/>
          <Route path='signup' element={<SignUp/>}/>
          <Route path='forgot' element={<Forgot/>}/>
          <Route path="otp" element={<OTP/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes> */}
        testing
      </div>
    );
}

export default App;