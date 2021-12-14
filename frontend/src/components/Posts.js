import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  //   const token = SignIn.token;
  const [error, seterror] = useState(false);
  const [posts, setPosts] = useState([]);
  const getPosts = () => {
    try {
      axios
        .get(`${BASE_URL}/posts`, { withCredentials: true })
        .then((result) => {
          if (result.data.error) {
            seterror(true);
          } else {
            console.log(result.data);
            setPosts(result.data);
          }
        });

     
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/logout`, {
        withCredentials: true,
      });
      console.log(result.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="home">
      <div className="blog">
        <h1>POSTS</h1>
        
        {error ? (
          <p style={{ marginTop: "50px" }}>login first</p>
        ) : null}
        <div className="posts">
          {posts?.map((item) => {
              return (
                <div key={item._id} className="post">
                  <img
                    src="https://images.pexels.com/photos/64699/pexels-photo-64699.jpeg"
                    wdith="100"
                    height="100"
                    alt=""
                  />
                  <h2 style={{ display: "inline" }}>{item.desc}</h2>
                  <p>created at {item.createdAt.slice(0,10)}</p>
                  {/* <button onClick={() => del(item._id)}>x</button> */}
                  <br />
                </div>
              );
            })}
        </div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
        {console.log(error)}
        {!error ? <button onClick={logout}>Logout</button> : null}
      </div>
    </div>
  );
};

export default Posts;