import React from "react";
import { deletePost } from "../api-adapter";
import { NavLink } from "react-router-dom";



const Profile = (props) => {
    const userData = props.userData
    const getPosts = props.getPosts
    const setGetPosts = props.setGetPosts
    const setSelectedTag = props.setSelectedTag
    const setEditingPost=props.setEditingPost
    const setPostToEdit = props.setPostToEdit

    async function handleDelete(e) {
        console.log(e)
        const deleted = await deletePost(e);
        console.log(deleted);
        const filteredPosts = getPosts.filter(post => post.id !== e);
        setGetPosts(filteredPosts)
    }

    async function handleChange(e) {
        const name = e.target[0].value
        const location = e.target[1].value
        const username = e.target[2].value
        const userId = userData.id 
    }

    

    return(
        <div className="profilePage">
            <div id="userInformation">
            <h1>User Profile:</h1>
        {userData ? 
                <form onSubmit={handleChange}>
                <div className="profileInfo"> 
                <label htmlFor="name">Name: </label>
                <input id="name" defaultValue={userData.name} />
                <br></br>
                <label htmlFor="location">Location: </label>
                <input id= "location" defaultValue={userData.location} />
                <br></br>
                <label htmlFor="username">Username: </label>
                <input id="username" defaultValue={userData.username}/>
                <br></br>
                <button>Edit Your Info</button>
                </div>
                </form>
        : null}
            </div>

            
        <div id="postLists">
        <h1>Your Post's:</h1>
        {getPosts.length ? getPosts.map((post, index) =>{
        if(post.author.username === localStorage.getItem("username")) {
            return( 
                <div className='onePost' key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Tags:
                    {post.tags.map((tag, index)=>{
                        return (
                            <small key={tag.id}> <NavLink to="/selected-tag" onClick={(function(){setSelectedTag(tag.name)})}>{tag.name}</NavLink> </small>
                        )
                    })}
                </p>
                <span>
                <button onClick={(function(){setPostToEdit(post.id); setEditingPost(true)})}>Edit Post</button>
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