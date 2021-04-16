import React from "react"
import {Link} from "react-router-dom";
import {useState} from 'react';
import { useCookies } from 'react-cookie';

const SignPage = () => {
  const [toggleSignup, setToggleSignup] = useState(false);
  const [cookies, setCookies] = useCookies(['game1up-user-token']);

  const toggleSignupController = () => {
    setToggleSignup(!toggleSignup);
    document.getElementById('error').style.display = 'none';
  }

  const errorHandler = (error_message) => {
    const error = document.getElementById('error');
    error.style.display = 'block';
    error.innerHTML = error_message;
  }

  const validateEmail = (email) => {
    const email_re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_re.test(String(email).toLowerCase());
  }

  const validatePassword = (password) => {
    const pw_re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,32}$/;
    return pw_re.test(password);
  }

  const handleSignUp = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let email_conf = document.getElementById("email_conf").value;
    let password_conf = document.getElementById("password_conf").value;
    if (!validateEmail(email)) {
      errorHandler("Enter a valid email!")
      return
    }
    if (email !== email_conf || password !== password_conf) {
      errorHandler("Make sure your email matches and the password matches.")
      return
    }
    if (!validatePassword(password)) {
      errorHandler("Password does not meet requirements. Must contain an uppercase and lowercase letter, a number, and be 8 to 32 characters long.")
      return
    }

    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/create",
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email:email,
        password:password,
        conf_email: email_conf,
        conf_password: password_conf
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      if (response.status === null) {
        throw Error(response.statusText)
      }
      if (response.status === "error")
        throw Error(response.server_message + ", " + response.error_message)
      if (response.status === "success") {
        console.log(response.token);
        setCookies("token", response.token);
        window.location.href = './profile-setup'
      }
    })
    .catch(function(error) {
      errorHandler(error);
      console.log(error);
    })
  }

  const handleLogin = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (!validateEmail(email)) {
      errorHandler("Enter a valid email!")
      return
    }

    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/login",
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
      if (response.status === null) {
        throw Error(response.statusText)
      }
      if (response.status === "error")
        throw Error(response.server_message + ", " + response.error_message)
      if (response.status === "success") {
        setCookies("token", response.token);
        window.location.href = './feed'
      }
    })
    .catch(function(error) {
      errorHandler(error)
      console.log(error);
    })
  }

  let ret = (
    <div className="sign-page">
      <div className="signup-content">
        <h1> Game1Up </h1>
        <p id="error">Error message here!</p>
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
              <input type="email" id="email"/>
            </label>
            <label>
              <p> Confirm Email: </p>
              <input type="email" id="email_conf"/>
            </label>
            <label>
              <p> Password: </p>
              <input type="password" id="password"/>
            </label>
            <label>
              <p> Confirm Password: </p>
              <input type="password" id="password_conf"/>
            </label>
          </>)
        }
        {!toggleSignup? <button className="login-button" onClick={handleLogin}> <h3>Login</h3> </button> : <button className="login-button" onClick={handleSignUp}> <h3>Sign Up</h3> </button>}
        <button className="button-no-style login-button" onClick={toggleSignupController}><p>{toggleSignup ?"Already have an account? Login":"Don't have an account? Sign Up"}</p></button>
      </div>
    </div>
  )

  return ret;
}

export default SignPage
