import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { NavLink } from 'react-router-dom';
import { LogIn, registerUser } from "../api-adapter";

const Navbar = (props) => {
  const setLoggedIn = props.setLoggedIn;
  const setMakingPost = props.setMakingPost;

  async function logout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  async function login(event) {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    const { token } = await LogIn(username, password);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.setItem("token", token);
    localStorage.setItem("username", username)
    setLoggedIn(token);
  }

  async function register(event) {
      event.preventDefault()
      const username= event.target[0].value
      const password= event.target[1].value
      const name = event.target[3].value
      const location = event.target[4].value
      const {token} = await registerUser(username, password, name, location)
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.setItem("token", token);
      localStorage.setItem("username", username)
      setLoggedIn(token);

      // work around solution
      // alert("Thanks for making an account :) Please sign in")
    }

  async function createPostMenu() {
    setMakingPost(true)
  }

  return (
    <div id="navbar">
      <NavLink to ="/"><div className="logo">
      <img src="https://www.iconbolt.com/iconsets/fluent-emoji-flat/beverage-box.svg" />
      <h2>JuiceBox</h2>
      </div></NavLink>
      <div className="navFunctions">
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
            <form className="submissionForm" onSubmit={register}>
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
              <br></br>
              <span>
                <label htmlFor="name">Name: </label>
                <input id="name" type="text" required />
              </span>
              <br></br>
              <span>
                <label htmlFor="location">Location: </label>
                <input id="location" type="text" required />
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
          <button className="createPostButton" onClick={createPostMenu}>Create Post</button>
          <NavLink to ="/profile"><button>Profile</button></NavLink>
          <button className="logOutButton" onClick={logout}>
            {" "}
            Logout{" "}
          </button>
        </>
      )}
    </div>
    </div>
  );
};


export default Navbar;
