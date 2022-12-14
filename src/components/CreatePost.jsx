import React from "react";
import { makePost } from "../api-adapter";

const CreatePost = (props) => {
    const makingPost = props.makingPost
    const setMakingPost = props.setMakingPost
    const getPosts = props.getPosts
    const setGetPosts = props.setGetPosts

    async function closeCreatePost() {
        setMakingPost(false)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const title = event.target[0].value
        const content = event.target[1].value
        const tags = event.target[2].value
        const makeNewPost = await makePost(title, content, tags)
        setGetPosts([...getPosts, makeNewPost.post])
        setMakingPost(false)
        event.target[0].value = ''
        event.target[1].value = ''
        event.target[2].value = ''
    }

    return(
        <div className={`${makingPost}`} id="createPostMenu">
        <div className="createPostMenu">
        <span className="material-symbols-outlined" onClick={closeCreatePost}>close</span>
        <form onSubmit={handleSubmit}>
            <h3>Create A Post</h3>
            <label htmlFor="postTitle">Title: </label>
            <input id="postTitle" type="text" required />
            <br/>
            <label htmlFor="postContent">Body: </label>
            <input id="postContent" type="text" required />
            <br/>
            <label htmlFor="postTags">Tags: <small>All tags must begin with # !</small></label>
            <input id="postTags" type="text" required />
            <button className="lr-submitButton" type="submit">Create Post</button>
        </form>
        </div>
        </div>
    )
}

export default CreatePost