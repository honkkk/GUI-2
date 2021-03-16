import React from "react"
import {game, dice, clock} from "./icons.js"
import UserList from "./userList.js"

const EventCard = () => {

  let users = ["A", "B", "C", "D", "E"];

  let ret = (
    <div className="event event-bar" style={{'border-left': '5px solid green'}}>
      <button className="event-bar-expand"> V</button>
      <div className="event-user-status user-icon-list">
        <UserList users={users}/>
      </div>
      <div className="event-bar-title">
        <h3> Event Title Goes Here</h3>
      </div>
      <div className="event-bar-details">
        {dice(22, 22)}
        <p>List of some games, This list can be long, if it's too long, cut it off, etc. </p>
        {game(22, 22)}
        <p>13 Rockwood Rd Norfolk, MA </p>
        {clock(22, 22)}
        <p>Mon. March 13th </p>
      </div>
    </div>
  )

  return ret;
}

export default EventCard
