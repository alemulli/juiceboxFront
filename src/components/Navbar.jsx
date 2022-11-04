import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { LogIn, registerUser } from "../api-adapter";

const Navbar = (props) => {
  const setLoggedIn = props.setLoggedIn;
  const setMakingPost = props.setMakingPost;
  const setUserData = props.setUserData;
  const setSelectedUser = props.setSelectedUser;

  const navigate = useNavigate();

  async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUserData();
    setSelectedUser();
    navigate("/");
  }

  async function login(event) {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    const  response  = await LogIn(username, password);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    if (response.token) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("username", username);
    setLoggedIn(response.token)
    event.target[0].value = ''
    event.target[1].value = ''
    } else {
      setLoggedIn(false)
      event.target[0].value = ''
      event.target[1].value = ''
      return(
        alert("Username not found or username and password do not match. Please check your credentials or register a new account.")
    )
    }
  }

  async function register(event) {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    const confirmedPassword = event.target[2].value;
    const name = event.target[3].value;
    const location = event.target[4].value;
    if (password === confirmedPassword) {
      const response = await registerUser(username, password, name, location);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("username", username);
        setLoggedIn(response.token)
        event.target[0].value = ''
        event.target[1].value = ''
        event.target[2].value = ''
        event.target[3].value = ''
        event.target[4].value = ''
      } else {
        setLoggedIn(false)
        alert("Account is already registered. Please log in.")
        event.target[0].value = ''
        event.target[1].value = ''
        event.target[2].value = ''
        event.target[3].value = ''
        event.target[4].value = ''
      }
    } else {
      alert("Passwords do not match!")
      event.target[0].value = ''
      event.target[1].value = ''
      event.target[2].value = ''
      event.target[3].value = ''
      event.target[4].value = ''
    }
  }

  async function createPostMenu() {
    setMakingPost(true);
  }

  return (
    <div id="navbar">
      <NavLink to="/">
        <div className="logo">
          <img src="https://www.iconbolt.com/iconsets/fluent-emoji-flat/beverage-box.svg" />
          <h2>JuiceBox</h2>
        </div>
      </NavLink>
      <div className="navFunctions">
        {!localStorage.token ? (
          <>
            <Popup trigger={<button>Log In</button>} position="bottom right">
              <form id="loginForm" className="submissionForm" onSubmit={login}>
                <h3>Log In</h3>
                <span>
                  <label htmlFor="username">Username: </label>
                  <input id="username" type="text" required />
                </span>
                <span>
                  <label htmlFor="password">Password: </label>
                  <input id="password" type="password" required />
                </span>
                <button className="lr-submitButton" type="submit">
                  {" "}
                  Submit{" "}
                </button>
              </form>
            </Popup>
            <Popup trigger={<button>Sign Up</button>} position="bottom right">
              <form id="registerForm" className="submissionForm" onSubmit={register}>
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
                <span>
                  <label htmlFor="name">Name: </label>
                  <input id="name" type="text" required />
                </span>
                <span>
                  <label htmlFor="location">Location: </label>
                  <input id="location" type="text" required />
                </span>
                <button className="lr-submitButton" type="submit">
                  {" "}
                  Submit{" "}
                </button>
              </form>
            </Popup>
          </>
        ) : (
          <>
            <button className="createPostButton" onClick={createPostMenu}>
              Create Post
            </button>
            <NavLink to="/profile">
              <button>Profile</button>
            </NavLink>
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
