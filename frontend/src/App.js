import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Posts from './components/Posts'
import { useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import ActivateAccount from './components/ActivateAccount';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div>
      <Navbar user={user} setLoggedUser={setUser} />
      <Routes>
        <Route exact path="/"
            element={!user ? <Navigate to="/login" /> : <Home />}/>
        <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setLoggedUser={setUser} />}
          />
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path="/posts" element={<Posts/>}/>
        <Route exact path="/forgot-password" element={<ForgetPassword/>}/>
        <Route exact path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route exact path="/activate/:token" element={<ActivateAccount setLoggedUser={setUser} />}/>

      </Routes>
    </div>
  );
}

export default App;
