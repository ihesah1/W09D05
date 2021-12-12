import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const signup = async (e) => {
    try {
    
      e.preventDefault();
      const result = await axios.post(`${BASE_URL}/register`, {
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        password2: e.target.password2.value,
        role: "61a5fa0c61788b4efccc7708",
      });
      console.log(result.data); 
      if (result.data.errors) {
          console.log(result.data.errors[0].msg);
          setErr(result.data.errors[0].msg);
        } else if (result.data.message){
            setErr(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <div className="home">
    <div className="formm">
      <h1>Sign Up</h1>
      {/* signup form when submitted excute signup function */}
      <form onSubmit={signup}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <label htmlFor="password2">Confirm Password:</label>
        <input type="password" name="password2" />
        <button type="submit">Sign up</button>
      </form>
      <p>{err}</p>
      <button
        // button for back when clicked go to home page
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
      </div>
    </div>
  );
};

export default SignUp;