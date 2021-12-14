import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import GoogleOrFacebookAuth from "./GoogleOrFacebookAuth";

const ForgetPassword = ({ setLoggedUser }) => {
  const [err, setErr] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const requestReset = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const result = await axios.post(`http://localhost:5000/password/forgot`, {
        email,
      });
      console.log(result);
      if (result.data.errors) {
        setErr(result.data.errors);
      } else if (result.data.message) {
        setMessage(result.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErr(error.response.data.errors);
      console.log({ error });
    }
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Forgot your Password</h1>
      <div className="wrapper">
        <form className="right">
          {message && (
            <>
              <h5>{message}</h5>
              <br />
            </>
          )}
           {loading && <h3>Please wait...</h3>}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <button type="submit" onClick={requestReset} className="submit">
            Request Password Reset
          </button>
          {err && err?.map((e) => <p>{e.msg}</p>)}
          <br />
          <Link to="/login">Back to Login</Link>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
