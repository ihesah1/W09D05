import React from "react";
import { Routes, Route} from "react-router-dom";
import Post from "./components/Posts";
import { useSelector } from "react-redux";
import SignUp from "./components/SignUp";
///import Login from "./components/Login";
import Posts from "./reducer/post";


function App() {

  return (
  <>
    <Routes>
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
   
  );
}

export default App;
