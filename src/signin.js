import React from "react"
import {Link} from "react-router-dom";
import {useState} from 'react';

const SignPage = () => {
  const [toggleSignup, setToggleSignup] = useState(false);

  const toggleSignupController = () => {
    setToggleSignup(!toggleSignup);
  }

  let ret = (
    <div className="sign-page">
      <div className="signup-content">
        <h1> Game1Up </h1>
        { !toggleSignup && (
          <>
            <label>
              <p> Email: </p>
              <input type="email"/>
            </label>
            <label>
              <p> Password: </p>
              <input type="password"/>
            </label>
          </>)
        }
        { toggleSignup && (
          <>
            <label>
              <p> Email: </p>
              <input type="email"/>
            </label>
            <label>
              <p> Confirm Email: </p>
              <input type="email"/>
            </label>
            <label>
              <p> Password: </p>
              <input type="password"/>
            </label>
            <label>
              <p> Confirm Password: </p>
              <input type="password"/>
            </label>
          </>)
        }
        <Link to={!toggleSignup ?"/feed":"/profile-setup"}><button className="login-button"> <h3>{!toggleSignup ?"Login":"Sign Up"}</h3> </button></Link>
        <button className="button-no-style login-button" onClick={toggleSignupController}><p>{toggleSignup ?"Already have an account? Login":"Don't have an account? Sign Up"}</p></button>
      </div>
    </div>
  )

  return ret;
}

export default SignPage
