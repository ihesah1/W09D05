import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import GoogleOrFacebookAuth from "./GoogleOrFacebookAuth";

const Login = ({setLoggedUser}) => {
  const [err, setErr] = useState([]);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(`http://localhost:5000/login`, {
        username: user.username,
        password: user.password,
      });
      if (result.data.errors) {
        setErr(result.data.errors);
      } else if (result.data.user) {
        setLoggedUser(result.data.user)
      }
    } catch (error) {
      setErr(error.response.data.errors);
      console.log({ error });
    }
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <GoogleOrFacebookAuth />
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <form className="right">
          <input
            value={user.username}
            onChange={handleInputChange}
            name="username"
            type="text"
            placeholder="Username"
          />
          <input
            value={user.password}
            onChange={handleInputChange}
            name="password"
            type="text"
            placeholder="Password"
          />
          <button type="submit" onClick={login} className="submit">
            Login
          </button>
          {err && err?.map((e) => <p>{e.msg}</p>)}
          <br />
          <Link to="/signup">Register here</Link>
          <br />
          <br />
          <Link to="/forgot-password">Forgot your password?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
