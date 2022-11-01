import React, { useState, useEffect } from "react";
import { Navbar, Posts, CreatePost } from './'
import { GetPosts } from "../api-adapter";

const Main = () => {
  const[getPosts, setGetPosts] = useState([])
  const[loggedIn, setLoggedIn] = useState(false)
  const [makingPost, setMakingPost] = useState(false)

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
      <Navbar setLoggedIn={setLoggedIn} setMakingPost={setMakingPost}/>
      <Posts getPosts={getPosts} />
      <CreatePost makingPost={makingPost} setMakingPost={setMakingPost} setGetPosts={setGetPosts} getPosts={getPosts}/>
    </div>
  );
};

export default Main;
