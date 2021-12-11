import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const signup = () => {
    axios.post(`${process.env.REACT_APP_BASIC_URL}/signup`, {
      email: email,
      password: password,
      role:'61a5fa0c61788b4efccc7708',
      username:username,
      
    });
    navigate(`/login`);
  };

  return (
    <div>
        <input
        placeholder="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <input
        placeholder="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button onClick={register}>register</button>
    </div>
  );
}
export default SignUp;