import React from "react";

const Posts = (props) => {
    const getPosts = props.getPosts

    return(
        <div className="allPosts">
        {getPosts.length ? getPosts.map((post, index) =>{
            {console.log(post)}
            return( 
            <div className='onePost' id={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>Tags:
                {post.tags.map((tag, index)=>{
                    return (
                    <span>{tag.name} </span>
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