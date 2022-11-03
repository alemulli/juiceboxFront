import React, { useState, useEffect } from "react";
import { Navbar, Posts, CreatePost, Profile, SelectedUser, SelectedTag, EditPost } from './'
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
  const[selectedUser, setSelectedUser] = useState()
  const[selectedTag, setSelectedTag] = useState()
  const[editingPost, setEditingPost] = useState(false)

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
            <Route path="/" element={<Posts getPosts={getPosts} setSelectedUser={setSelectedUser} setSelectedTag={setSelectedTag} setGetPosts={setGetPosts}/>} />
            <Route path="/profile" element={<Profile userData={userData} getPosts={getPosts} setGetPosts={setGetPosts} setSelectedTag={setSelectedTag} setEditingPost={setEditingPost}/>} />
            <Route path="/selected-user" element={<SelectedUser selectedUser={selectedUser} setSelectedTag={setSelectedTag}/>}/>
            <Route path="/selected-tag" element={<SelectedTag selectedTag={selectedTag} setSelectedTag={setSelectedTag}/>}/>
          </Routes>
        <CreatePost makingPost={makingPost} setMakingPost={setMakingPost} setGetPosts={setGetPosts} getPosts={getPosts}/>
        <EditPost editingPost={editingPost} setEditingPost={setEditingPost} setGetPosts={setGetPosts} getPosts={getPosts}/>
      </div>
    </Router>
  );
};

export default Main;
