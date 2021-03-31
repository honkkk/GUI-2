import React from "react"
import {user, plus} from "../shared/icons.js"

const ProfileSetup = ({nextHandler, changeHandler, userData}) => {

  // All the sections that will be rendered to the user. Display order depends on the value of current
  return (<>
      <div className="user-icon">
        {user(75, 75)}
        <button className="plus">{plus(20, 20)}</button>
      </div>
      <div className="setup-field">
        <label>
          <p> Username </p>
          <input id="username" type="text" onChange={changeHandler} value={userData.username}/>
        </label>
        <div className="name-field">
          <label>
            <p> Name </p>
            <input id="fName" type="text" placeholder="First" onChange={changeHandler} value={userData.fName}/>
          </label>
          <label>
            <input id="lName" type="text" placeholder="Last" onChange={changeHandler} value={userData.lName}/>
          </label>
        </div>
        <div className="date-field">
          <label>
            <p> Birthday </p>
            <input id="day" type="text" placeholder="Day" onChange={changeHandler} value={userData.day}/>
          </label>
          <label>
            <input id="month" type="text" placeholder="Month" onChange={changeHandler} value={userData.month}/>
          </label>
          <label>
            <input id="year" type="text" placeholder="Year" onChange={changeHandler} value={userData.year}/>
          </label>
        </div>
      </div>
      <button className="setup-next" onClick={nextHandler}>Next</button>
    </>)
}

export default ProfileSetup
