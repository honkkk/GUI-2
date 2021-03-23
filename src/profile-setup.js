import React from "react"
import {Link} from "react-router-dom";
import {useState} from 'react';
import {user, arrow_right, plus} from "./icons.js"
import ProgressBar from "./status-bar.js"

const ProfileSetup = () => {

  const [options, setOptions] = useState(["Profile", "Categories", "Games", "Locations"]);
  const [current, setCurrent] = useState(3);



  return (
    <div className="sign-page">
      <div className="signup-content profile-setup">
        <h1> Profile Setup </h1>
        <ProgressBar options={options} current={current} />
        <div class="profile-fields">
          <div class="user-icon">
            {user(75, 75)}
            <button class="plus">{plus(20, 20)}</button>
          </div>
          <div className="setup-field">
            <label>
              <p> Username </p>
              <input type="text"/>
            </label>
          </div>
          <button class="setup-next">Next</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup
