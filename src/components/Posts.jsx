import React from "react";

const Posts = (props) => {
    const getPosts = props.getPosts

    return(
        <div className="allPosts">
        {getPosts.length ? getPosts.map((post, index) =>{
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
        }): null}
        </div>
    )
}

export default Posts