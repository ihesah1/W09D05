import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleOrFacebookAuth from "./GoogleOrFacebookAuth";

const SignUp = () => {
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    setErr("");
    setMessage("");
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const signup = async (e) => {
    setLoading(true)
    try {
      e.preventDefault();
      const result = await axios.post(`http://localhost:5000/register`, {
        username: user.username,
        email: user.email,
        password: user.password,
        password2: user.password2,
        role: "61a5fa0c61788b4efccc7708",
      });
      console.log(result.data);
      if (result.data.errors) {
        console.log(result.data.errors[0].msg);
        setErr(result.data.errors[0].msg);
      } else if (result.data.message) {
        setMessage(result.data.message);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  return (
    <div className="login">
      <h1 className="loginTitle">Choose a SignUp Method</h1>
      <div className="wrapper">
        <GoogleOrFacebookAuth />
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <form className="right">
          {message && (
            <>
              <h5>{message}</h5>
              <br />
            </>
          )}

          {loading && <h3>Please wait...</h3>}
          <br/>
          <input
            type="text"
            value={user.username}
            onChange={handleInputChange}
            name="username"
            placeholder="Username"
          />
          <input
            type="text"
            value={user.email}
            onChange={handleInputChange}
            name="email"
            placeholder="Email"
          />
          <input
            type="text"
            value={user.password}
            onChange={handleInputChange}
            name="password"
            placeholder="Password"
          />
          <input
            type="text"
            value={user.password2}
            onChange={handleInputChange}
            name="password2"
            placeholder="Confirm Password"
          />
          <button type="submit" onClick={signup} className="submit">
            Sign Up
          </button>
          {err && <p>{err}</p>}
          <br />
          <Link to="/login">Login here</Link>
          <br />
          <br />
          <Link to="/forgot-password">Forgot your password?</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
