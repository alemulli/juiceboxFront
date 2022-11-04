import React from "react";
import { deletePost } from "../api-adapter";
import { NavLink } from "react-router-dom";

const Profile = (props) => {
  const userData = props.userData;
  const getPosts = props.getPosts;
  const setGetPosts = props.setGetPosts;
  const setSelectedTag = props.setSelectedTag;
  const setEditingPost = props.setEditingPost;
  const setPostToEdit = props.setPostToEdit;

  async function handleDelete(e) {
    const deleted = await deletePost(e);
    const filteredPosts = getPosts.filter((post) => post.id !== e);
    setGetPosts(filteredPosts);
  }

  return (
    <div className="profilePage">
      <div id="userInformation">
        <h1>User Profile:</h1>
        {userData ? (
          <div className="profileInfo">
            <p>Name: {userData.name}</p>
            <p>Location: {userData.location}</p>
            <p>Username: {userData.username}</p>
          </div>
        ) : null}
      </div>
      <div id="postLists">
        
        {getPosts.length
          ? getPosts.map((post, index) => {
              if (post.author.username === localStorage.getItem("username")) {
                return (
                  <div className="onePost" key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <small>
                      Tags:
                      {post.tags.map((tag, index) => {
                        return (
                          <span key={tag.id}>
                            {" "}
                            <NavLink
                              to="/selected-tag"
                              onClick={function () {
                                setSelectedTag(tag.name);
                              }}
                            >
                              {tag.name}
                            </NavLink>{" "}
                          </span>
                        );
                      })}
                    </small>
                    <div className="buttons">
                      <button
                        onClick={function () {
                          setPostToEdit(post.id);
                          setEditingPost(true);
                        }}
                      >
                        Edit Post
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(post.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              }
            })
          : null}
      </div>
    </div>
  );
};

export default Profile;
