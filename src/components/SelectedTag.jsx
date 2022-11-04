import react from "react";
import { getPostByTag } from "../api-adapter";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SelectedTag = (props) => {
    const selectedTag = props.selectedTag
    const setSelectedTag = props.setSelectedTag
    const [tag, setTag] = useState({})

    const string = selectedTag
    const tagWithNoHash = string.substring(1)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPostByTag(tagWithNoHash);
            setTag(data)
        }
        fetchData();
    }, [selectedTag])

    return ( 
    <div className="allPosts">

     {tag && tag.posts && tag.posts.length ? tag.posts.map((post, index) =>{
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
)}
    

export default SelectedTag;
 


