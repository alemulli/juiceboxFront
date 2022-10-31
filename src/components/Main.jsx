import React, { useState, useEffect } from "react";
import { Navbar, Posts } from './'
import { GetPosts } from "../api-adapter";

const Main = () => {
  const[getPosts, setGetPosts] = useState([])
  const[loggedIn, setLoggedIn] = useState(false)

  useEffect (() => {
    const userLogIn = localStorage.getItem("token")
    if (userLogIn) {
      setLoggedIn(userLogIn)

    }
  }, [loggedIn]);

  useEffect(()=>{
    const fetchData = async () => {
      const data = await GetPosts();
  
      setGetPosts(data);
      
    }
    fetchData();
  }, []);


  return (
    <div id="main">
      <Navbar setLoggedIn={setLoggedIn}/>
      <Posts getPosts={getPosts} />
    </div>
  );
};

export default Main;
