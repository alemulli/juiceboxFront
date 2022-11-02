import React from "react";

const Profile = (props) => {
    const userData = props.userData
    console.log(userData)

    return(
        <div className="profilePage">
            <h1>User Profile:</h1>
        {userData ? 
                <div className="profileInfo"> 
                <p>Name:{userData.name}</p>
                <p>Location:{userData.location}</p>
                </div>
        : null}
        </div>
)}


export default Profile