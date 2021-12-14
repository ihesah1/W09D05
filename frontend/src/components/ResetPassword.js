import React, { useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const ResetPassword = ({ setLoggedUser }) => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [err, setErr] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const result = await axios.post(`http://localhost:5000/password/reset`, {
        password,
        password2,
        token
      });
      console.log(result);
      if (result.data.error) {
        setErr(result.data.error);
      } else if (result.data.message) {
        alert(result.data.message)
        navigate("/login")
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
      <h1 className="loginTitle">Reset Password</h1>
      <div className="wrapper">
        <form className="right">
           {loading && <h3>Please wait...</h3>}
           <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Enter new password"
          />
          <input
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            name="password2"
            type="password"
            placeholder="Confirm new password"
          />
          <button type="submit" onClick={resetPassword} className="submit">
            Reset Password
          </button>
          {err && <p>{err}</p>}
          <br />
          <Link to="/login">Back to Login</Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
