import React from "react";
import { deletePost } from "../api-adapter";

const Posts = (props) => {
    const getPosts = props.getPosts
    const setGetPosts = props.setGetPosts

    async function handleDelete(e) {
        // const toDelete = e.target.id;
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
                <small>By: {post.author.username}</small>
                <p>{post.content}</p>
                <p>Tags:
                {post.tags.map((tag, index)=>{
                    return (
                    <span key={tag.id}> {tag.name} </span>
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