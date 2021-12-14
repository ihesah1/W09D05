import React from 'react'
import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
const GoogleOrFacebookAuth = () => {
    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
      };
    
      const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
      };
    return (
        <div className="left">
            <h2>Continue with</h2>
            <br />
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
        </div>
    )
}

export default GoogleOrFacebookAuth
