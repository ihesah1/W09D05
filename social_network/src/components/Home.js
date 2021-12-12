import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
          return (
        <div className="home">
          <div className="homeContainer">
            <h1>Social Network</h1>
            <div className="btns">
              <button><Link className='s' style={{textDecoration:'none'}} to="login">Login</Link></button>
              <button><Link className='s' style={{textDecoration:'none'}} to="signUp">Sign up</Link></button>
            </div>
          </div>
        </div>
      );
    };
    

export default Home;