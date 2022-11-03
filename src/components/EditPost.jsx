import React from "react";
import { updatePost } from "../api-adapter";

const EditPost = (props) => {
    const editingPost = props.editingPost
    const setEditingPost = props.setEditingPost
    const getPosts = props.getPosts
    const setGetPosts = props.setGetPosts

    async function closeEditPost() {
        setEditingPost(false)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const title = event.target[0].value
        const content = event.target[1].value
        const tags = event.target[2].value
        const makeNewPost = await updatePost(title, content, tags)
        setGetPosts([...getPosts, makeNewPost.post])
        setEditingPost(false)
    }

    return(
        <div className={`${editingPost}`} id="editPostMenu">
        <div className="editPostMenu">
        <span className="material-symbols-outlined" onClick={closeEditPost}>close</span>
        <form onSubmit={handleSubmit}>
            <h3>Edit Post</h3>
            <label htmlFor="postTitle">Title: </label>
            <input id="postTitle" type="text" required />
            <br/>
            <label htmlFor="postContent">Body: </label>
            <input id="postContent" type="text" required />
            <br/>
            <label htmlFor="postTags">Tags: <small>ALL TAGS MUST BEGIN WITH # !</small></label>
            <input id="postTags" type="text" required />
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
        </div>
    )
}

export default EditPost