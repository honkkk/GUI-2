import React from "react"
import {Link} from "react-router-dom";

const SignPage = () => {

  let ret = (
    <div className="sign-page">
      <div className="signup-content">
        <h1> Game1Up </h1>
        <label>
          <p> Email: </p>
          <input type="text"/>
        </label>
        <label>
          <p> Password: </p>
          <input type="password"/>
        </label>
        <Link to="/"><button> <h3>Login</h3> </button></Link>
        <Link to="/"><p>Sign Up</p></Link>
      </div>
    </div>
  )

  return ret;
}

export default SignPage
