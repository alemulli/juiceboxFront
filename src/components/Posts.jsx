import React from "react";
import { deletePost } from "../api-adapter";
import { NavLink } from "react-router-dom";

const Posts = (props) => {
    const getPosts = props.getPosts
    const setGetPosts = props.setGetPosts
    const setSelectedUser = props.setSelectedUser
    const setSelectedTag = props.setSelectedTag

    async function handleDelete(e) {
        console.log(e)
        const deleted = await deletePost(e);
        console.log(deleted);
        const filteredPosts = getPosts.filter(post => post.id !== e);
        setGetPosts(filteredPosts)
    }

    return(
        <div className="allPosts">
        {getPosts.length ? getPosts.map((post, index) =>{
            return( 
            <div className='onePost' key={post.id}>
                <h2>{post.title}</h2>
                <small>By: <NavLink to="/selected-user" onClick={(function(){setSelectedUser(post.author.id)})}>{post.author.username}</NavLink></small>
                <p>{post.content}</p>
                <p>Tags:
                {post.tags.map((tag, index)=>{
                    return (
                    <small key={tag.id}> <NavLink to="/selected-tag" onClick={(function(){setSelectedTag(tag.name)})}>{tag.name}</NavLink> </small>
                    )
                })}
            </p>
            {post.author.username === localStorage.getItem("username") ?
             <button onClick={(e)=>{handleDelete(post.id)}}>Delete</button> 
            : null}
            </div>
            )
        }): null}
        </div>
    )
}

export default Posts