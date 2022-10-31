import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { LogIn } from "../api-adapter";

const Navbar = (props) => {
  const setLoggedIn = props.setLoggedIn;

  async function logout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  async function login(event) {
    event.preventDefault();
    console.log("hello we made it");
    const username = event.target[0].value;
    const password = event.target[1].value;
    const { token } = await LogIn(username, password);
    console.log(token);
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    setLoggedIn(token);
  }

  return (
    <div id="navbar">
      <h2>JuiceBox</h2>
      <form id="searchBar">
        <input
          type="search"
          placeholder="Search Posts"
          /*onChange={handleSearch}*/
        />
      </form>
      {!localStorage.token ? (
        <>
          <Popup trigger={<button>Log In</button>} position="bottom center">
            <form className="submissionForm" onSubmit={login}>
              <h3>Log In</h3>
              <span>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" required />
              </span>
              <span>
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" required />
              </span>
              <button className="submitButton" type="submit">
                {" "}
                Submit{" "}
              </button>
            </form>
          </Popup>
          <Popup trigger={<button>Sign Up</button>} position="bottom center">
            <form className="submissionForm" /*onSubmit={handleSubmit}*/>
              <h3>Register an Account</h3>
              <span>
                <label htmlFor="username">Username: </label>
                <input id="username" type="text" required />
              </span>
              <span>
                <label htmlFor="password">Password: </label>
                <input id="password" type="password" required />
              </span>
              <span>
                <label htmlFor="Confirm password">Confirm Password: </label>
                <input id="Confirm password" type="password" required />
              </span>
              <button className="submitButton" type="submit">
                {" "}
                Submit{" "}
              </button>
            </form>
          </Popup>
        </>
      ) : (
        <>
          <button className="logOutButton" onClick={logout}>
            {" "}
            Logout{" "}
          </button>
          <Popup
            trigger={<button>Create Posts</button>}
            position="bottom center"
          >
            <form>
              <h3>Create A Post</h3>
              <span>
              <label htmlFor="title">Title:</label>
              <input id="postTitle" type="text" required />
              </span>
              <br></br>
              <span>
              <label htmlFor="content">Body:</label>
              <input id="postContent" type="text" required />
              </span>
              <br></br>
              <span>
              <label htmlFor="tags">Tags:</label>
              <input id="postTags" type="text" required />
              </span>
              <button type="submit">Create Post</button>
            </form>
          </Popup>
        </>
      )}
    </div>
  );
};

export default Navbar;
