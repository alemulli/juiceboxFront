import React, { useState, useEffect } from "react";
import { Navbar, Posts, CreatePost, Profile } from './'
import { GetPosts, getUser } from "../api-adapter";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

const Main = () => {
  const[getPosts, setGetPosts] = useState([])
  const[loggedIn, setLoggedIn] = useState(false)
  const[makingPost, setMakingPost] = useState(false)
  const[userData, setUserData] = useState()

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

  useEffect(()=>{
    const fetchData = async() =>{
      const data = await getUser();

      setUserData(data[0]);
    }
    fetchData();
  }, [])


  return (
    <Router>
      <div id="main">
        <Navbar setLoggedIn={setLoggedIn} setMakingPost={setMakingPost}/>
          <Routes>
            <Route path="/" element={<Posts getPosts={getPosts} />} />
            <Route path="/profile" element={<Profile userData={userData} getPosts={getPosts}/>} />
          </Routes>
        <CreatePost makingPost={makingPost} setMakingPost={setMakingPost} setGetPosts={setGetPosts} getPosts={getPosts}/>
      </div>
    </Router>
  );
};

export default Main;
