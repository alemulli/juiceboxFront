import React from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { login } from "../helper-functions/login";

const Navbar = () => {

  return (
    <div id="navbar">
        <h2>JuiceBox</h2>
        <form id="searchBar">
            <input type="search"
            placeholder="Search Posts"  
            /*onChange={handleSearch}*/ />
        </form>
        <Popup trigger={<button>Log In</button>} position="bottom center">
          <form className="submissionForm" onSubmit={login}>  
            <h3>Log In</h3>
            <span>
            <label htmlFor="username">Username: </label>
            <input id="username" type='text' required />
            </span>
            <span>
            <label htmlFor="password">Password: </label>
            <input id="password" type='password' required />
            </span>
            <button className="submitButton" type="submit"> Submit </button>
          </form>
        </Popup>
        <Popup trigger={<button>Sign Up</button>} position="bottom center">
          <form className="submissionForm" /*onSubmit={handleSubmit}*/>
            <h3>Register an Account</h3>
            <span>
            <label htmlFor="username">Username: </label>
            <input id="username" type='text' required />
            </span>
            <span>
            <label htmlFor="password">Password: </label>
            <input id="password" type='password' required />
            </span>
            <span>
            <label htmlFor="Confirm password">Confirm Password: </label>
            <input id="Confirm password" type='password' required />
            </span>
            <button className="submitButton" type="submit"> Submit </button>
          </form>
        </Popup>
  </div>
  );
};

export default Navbar;