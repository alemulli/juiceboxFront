import React from "react";
import { deletePost } from "../api-adapter";



const Profile = (props) => {
    const userData = props.userData
    const getPosts = props.getPosts
    const setGetPosts = props.setGetPosts

    async function handleDelete(e) {
        console.log(e)
        const deleted = await deletePost(e);
        console.log(deleted);
        const filteredPosts = getPosts.filter(post => post.id !== e);
        setGetPosts(filteredPosts)
    }

    async function handleChange() {

    }

    return(
        <div className="profilePage">
            <div id="userInformation">
            <h1>User Profile:</h1>
        {userData ? 
                <div className="profileInfo"> 
                <p>Name:{userData.name}</p>
                <p>Location:{userData.location}</p>
                <p>Username:{userData.username}</p>
                </div>
        : null}
            </div>
        <div id="postLists">

        {getPosts.length ? getPosts.map((post, index) =>{
        if(post.author.username === localStorage.getItem("username")) {
            return( 
                <div className='onePost' key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Tags:
                    {post.tags.map((tag, index)=>{
                        return (
                        <span key={tag.id}> {tag.name} </span>
                        )
                    })}
                </p>
                <span>
                <button onClick={(e) => {}}>Edit Post</button>
                <button onClick={(e)=>{handleDelete(post.id)}}>Delete</button>
                </span>
                
                </div>
                )
        }
        }): null}
        </div>
        </div>
)}


export default Profile