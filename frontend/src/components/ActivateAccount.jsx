import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActivateAccount = ({ setLoggedUser }) => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateUser = async () => {
      const result = await axios.post(
        `http://localhost:5000/account/activate`,
        { token }
      );
      if(result.data.success?.username){
          setLoggedUser(result.data.success)
          navigate("/")
        }else{
            alert("An error occurred")
            navigate("/login")
      }
    };
    activateUser();
  }, []);
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
      }}
    >
      <h1>Activating account. please wait...</h1>
      <br/>
      <h3>You will be redirected to home page</h3>
    </div>
  );
};

export default ActivateAccount;
