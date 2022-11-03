import react from "react";
import { getPostByUserId } from "../api-adapter";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SelectedUser = (props) => {
    const selectedUser = props.selectedUser
    const setSelectedTag = props.setSelectedTag
    const [user, setUser] = useState({})
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await getPostByUserId(selectedUser);
            setUser(data)
        }
        fetchData();
    }, [])

    return (
        <div className="profilePage">
        <div id="userInformation">
        <h1>User Profile:</h1>
    {user && user.userInfo && user.userInfo.id ? 
            <div className="profileInfo"> 
            <p>Name:{user.userInfo.name}</p> 
            <p>Location:{user.userInfo.location}</p>
            <p>Username:{user.userInfo.username}</p> 
            </div>
    : null}
        </div>
    <div id="postLists">

     {user && user.userInfo && user.userInfo.posts && user.userInfo.posts.length ? user.userInfo.posts.map((post, index) =>{
   {
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
            </div>
            )
    }
    }): null} 
    </div>
    </div>
)}
    

export default SelectedUser;
 


