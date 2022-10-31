import React, { useState, useEffect } from "react";
import { Navbar, Posts } from './'
import { GetPosts } from "../api-adapter";

const Main = () => {
  const[getPosts, setGetPosts] = useState([])

  useEffect(()=>{
    const fetchData = async () => {
      const data = await GetPosts();
  
      setGetPosts(data);
      console.log(data)
      
    }
    fetchData();
  }, []);

console.log(getPosts)

  return (
    <div id="main">
      <Navbar />
      <Posts getPosts={getPosts} />
    </div>
  );
};

export default Main;
