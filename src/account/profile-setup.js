import React from "react"
import {user, plus} from "../shared/icons.js"

const ProfileSetup = ({nextHandler}) => {

  // All the sections that will be rendered to the user. Display order depends on the value of current
  return (<>
      <div class="user-icon">
        {user(75, 75)}
        <button class="plus">{plus(20, 20)}</button>
      </div>
      <div className="setup-field">
        <label>
          <p> Username </p>
          <input type="text"/>
        </label>
        <div className="date-field">
          <label>
            <p> Birthday </p>
            <input type="text" placeholder="Day"/>
          </label>
          <label>
            <input type="text" placeholder="Month"/>
          </label>
          <label>
            <input type="text" placeholder="Year"/>
          </label>
        </div>
      </div>
      <button className="setup-next" onClick={nextHandler}>Next</button>
    </>)
}

export default ProfileSetup
