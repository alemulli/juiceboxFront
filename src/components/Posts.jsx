import React, { useMemo, useRef, useState }from "react";
import { deletePost } from "../api-adapter";
import { NavLink } from "react-router-dom";

const Posts = (props) => {
    const getPosts = props.getPosts
    const setGetPosts = props.setGetPosts
    const setSelectedUser = props.setSelectedUser
    const setSelectedTag = props.setSelectedTag
    const setEditingPost=props.setEditingPost
    const setPostToEdit = props.setPostToEdit

    const[searchResult, setSearchResult] = useState([])
    const[query, setQuery] = useState("")
    const inputRef = useRef()

    const filteredItems = useMemo(()=>{
        return getPosts.filter(post => {
            if(post.title.toLowerCase().includes(query.toLowerCase())){
                return post.title.toLowerCase().includes(query.toLowerCase())}
            if(post.author.username.toLowerCase().includes(query.toLowerCase())){
                return post.author.username.toLowerCase().includes(query.toLowerCase())}
            if(post.content.toLowerCase().includes(query.toLowerCase())){
                return post.content.toLowerCase().includes(query.toLowerCase())}
        })
    }, [getPosts, query])

    function onSubmit(e) {
        e.preventDefault()

        const value = inputRef.current.value
        if (value === "") return
        setSearchResult (prev => {
            return [...prev, value]
        })

        inputRef.current.value = ""
    }

    async function handleDelete(e) {
        const deleted = await deletePost(e);
        const filteredPosts = getPosts.filter(post => post.id !== e);
        await setGetPosts(filteredPosts)
    }

    return(
        <div className="allPosts">
            <form id="searchBar">
                <input 
                    value={query}
                    type="search"
                    placeholder="Search Posts"
                    onChange={e => setQuery(e.target.value)}
                    onSubmit={onSubmit}
                />
            </form>
        {filteredItems.length ? filteredItems.map((post, index) =>{
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
            <span>
             <button onClick={(function(){setPostToEdit(post.id); setEditingPost(true)})}>Edit Post</button>
             <button onClick={(e)=>{handleDelete(post.id)}}>Delete</button> 
            </span>
            : null}
            </div>
            )
        }): null}
        </div>
    )
}

export default Posts