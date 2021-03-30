import React from "react"
import {game, dice, clock, user, del} from "../shared/icons.js"
import UserList from "../shared/user-list.js"
import EventPopup from './event-popup.js'
import {useState} from 'react';

// EventBar component is used to show events in a bar format
// location       (required, string)     location for an event
// name           (required, string)     name of the event
// date           (required, string(?))  date for the event
// users          (required, [user])     a list of the users at the event
const EventBar = ({location, name, date, status, id}) => {

  const [togglePopup, setTogglePopup] = useState(false);

  let users = ["A", "B", "C", "D", "E"];

  const togglePopupController = () => {
    setTogglePopup(!togglePopup);
  }


  let ret = (
    <>
      {togglePopup && <EventPopup togglePopupController={togglePopupController} status={status} name={name} id={id}/>}
      <div className={"event event-bar " + (status == "joined" ? "event-joined " : "") + (status == "pending" ? "event-pending " : "")}>
        <button className="event-bar-expand" onClick={togglePopupController}> <p>Details</p></button>
        <div className="event-user-status user-icon-list">
          <UserList users={users} maxShown={2}/>
        </div>
        <div className="event-bar-title">
          <h3>{name}</h3>
        </div>
        <div className="event-bar-details">
          {dice(22, 22)}
          <p>List of some games, This list can be long, if it's too long, cut it off, etc. </p>
          {game(22, 22)}
          <p>{location}</p>
          {clock(22, 22)}
          <p>{date}</p>
        </div>
      </div>
    </>
  )

  return ret;
}

export default EventBar
