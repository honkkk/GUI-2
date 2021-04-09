import React from "react"
import {Link} from "react-router-dom";
import {useState} from 'react';
import { useCookies } from 'react-cookie';

const SignPage = () => {
  const [toggleSignup, setToggleSignup] = useState(false);
  const [cookies, setCookies] = useCookies(['game1up-user-token']);

  const toggleSignupController = () => {
    setToggleSignup(!toggleSignup);
  }

  const handleLogin = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const email_re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email_re.test(email)) {
      alert("Enter a valid email!")
      return
    }

    fetch("http://localhost:8888/.netlify/functions/api/account/login",
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:email,
        password:password
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      if (response.status == null) {
        throw Error(response.statusText)
      }
      if (response.status == "error")
        throw Error(response.server_message + ", " + response.error_message)
      if (response.status == "success") {
        setCookies("token", response.token);
        window.location.href = './feed'
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  let ret = (
    <div className="sign-page">
      <div className="signup-content">
        <h1> Game1Up </h1>
        { !toggleSignup && (
          <>
            <label>
              <p> Email: </p>
              <input type="email" id="email"/>
            </label>
            <label>
              <p> Password: </p>
              <input type="password" id="password"/>
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
        {!toggleSignup? <button className="login-button" onClick={handleLogin}> <h3>Login</h3> </button> : <button className="login-button"> <h3>Sign Up</h3> </button>}
        <button className="button-no-style login-button" onClick={toggleSignupController}><p>{toggleSignup ?"Already have an account? Login":"Don't have an account? Sign Up"}</p></button>
      </div>
    </div>
  )

  return ret;
}

export default SignPage
