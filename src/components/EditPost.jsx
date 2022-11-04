import React from "react";
import { updatePost } from "../api-adapter";

const EditPost = (props) => {
    const editingPost = props.editingPost
    const setEditingPost = props.setEditingPost
    const getPosts = props.getPosts
    const setGetPosts = props.setGetPosts
    const postToEdit = props.postToEdit

    async function closeEditPost() {
        setEditingPost(false)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const title = event.target[0].value
        const content = event.target[1].value
        const tags = event.target[2].value
        const makeNewPost = await updatePost( title, content, tags, postToEdit)
        const filteredPost = getPosts.filter((e) =>{
            if (e.id !== postToEdit) {
                return true
            }
            else {
                return false
            }
        })
        setGetPosts([...filteredPost, makeNewPost.post])
        setEditingPost(false)
        event.target[0].value = ''
        event.target[1].value = ''
        event.target[2].value = ''
    }

    return(
        <div className={`${editingPost}`} id="editPostMenu">
        <div className="editPostMenu">
        <span className="material-symbols-outlined" onClick={closeEditPost}>close</span>
        <form onSubmit={handleSubmit}>
            <h3>Edit Post</h3>
            <label htmlFor="postTitle1">Title: </label>
            <input id="postTitle1" type="text" required />
            <br/>
            <label htmlFor="postContent1">Body: </label>
            <input id="postContent1" type="text" required />
            <br/>
            <label htmlFor="postTags1">Tags: <small>All tags must begin with # !</small></label>
            <input id="postTags1" type="text" required />
            <button className="lr-submitButton" type="submit">Submit</button>
        </form>
        </div>
        </div>
    )
}

export default EditPost