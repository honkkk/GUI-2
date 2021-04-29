import React from "react"
import {game, dice, clock, user, del} from "../shared/icons.js"
import UserList from "../shared/user-list.js"
import EventPopup from './event-popup.js'
import DateString from "../shared/date-string.js"
import {useState} from 'react';

// EventBar component is used to show events in a bar format
// location       (required, string)     location for an event
// name           (required, string)     name of the event
// date           (required, string(?))  date for the event
// users          (required, [user])     a list of the users at the event
const EventBar = ({ users, capacity, host, location, games, details, name, date, status, id, handlers, categories}) => {

  const [togglePopup, setTogglePopup] = useState(false);

  const togglePopupController = () => {
    setTogglePopup(!togglePopup);
  }

  let category_string = "";

  const name_map = {board: 'Board Game', rp: "Role Playing", video:'Video Game', card:"Card Game"}

  for (var category in categories) {
    if (categories[category])
      category_string += (name_map[category] + ", ")
  }

  category_string = category_string.substring(0, category_string.length - 2)

  console.log(category_string);

  let ret = (
    <>
      {togglePopup && <EventPopup date = {date} location={location} users = {users} capacity = {capacity} host = {host} games = {games} handlers={handlers} togglePopupController={togglePopupController} status={status} name={name} id={id}/>}
      <div className={"event event-bar " + (status === "joined" ? "event-joined " : "") + (status === "pending" ? "event-pending " : "")}>
        <button className="event-bar-expand" onClick={togglePopupController}> <p>Details</p></button>
        <div className="event-user-status user-icon-list">
          <UserList users={users} maxShown={2}/>
        </div>
        <div className="event-bar-title">
          <h3>{name}</h3>
        </div>
        <div className="event-bar-details">
          {dice(22, 22)}
          <p>{category_string == ""? "No categories set" : category_string}</p>
          {game(22, 22)}
          <p>{location}</p>
          {clock(22, 22)}
          <DateString date = {date}/>
        </div>
      </div>
    </>
  )

  return ret;
}

export default EventBar
