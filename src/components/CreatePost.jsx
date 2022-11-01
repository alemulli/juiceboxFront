import React from "react";

const CreatePost = (props) => {
    const makingPost = props.makingPost
    const setMakingPost = props.setMakingPost

    async function closeCreatePost() {
        setMakingPost(false)
    }

    return(
        <div className={`${makingPost}`} id="createPostMenu">
        <div className="createPostMenu">
        <span className="material-symbols-outlined" onClick={closeCreatePost}>close</span>
        <form>
            <h3>Create A Post</h3>
            <label htmlFor="title">Title: </label>
            <input id="postTitle" type="text" required />
            <br/>
            <label htmlFor="content">Body: </label>
            <input id="postContent" type="text" required />
            <br/>
            <label htmlFor="tags">Tags: </label>
            <input id="postTags" type="text" required />
            <br />
            <button type="submit">Create Post</button>
        </form>
        </div>
        </div>
    )
}

export default CreatePost