import React from "react";



const Profile = (props) => {
    const userData = props.userData
    const getPosts = props.getPosts
    console.log(getPosts)

    return(
        <div className="profilePage">
            <h1>User Profile:</h1>
        {userData ? 
                <div className="profileInfo"> 
                <p>Name:{userData.name}</p>
                <p>Location:{userData.location}</p>
                <p>Username:{userData.username}</p>
                </div>
        : null}
        <div>

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
                </div>
                )
        }
        }): null}
        </div>
        </div>
)}


export default Profile