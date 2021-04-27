import React from "react"
import {game, dice, clock, del, user} from "../shared/icons.js"
import {useState} from 'react';
import EventPopup from './event-popup.js'
import DateString from "../shared/date-string.js"

// EventCard component is used to show events in a card format
// location       (required, string)     location for an event
// name           (required, string)     name of the event
// date           (required, string(?))  date for the event
// toggleButton   (bool)                 to show button for details or not?
const EventCard = ({users, capacity, host, location, games, details, name, date, status, id, handlers}) => {
  const [togglePopup, setTogglePopup] = useState(false);

  const togglePopupController = () => {
    setTogglePopup(!togglePopup);
  }

  return (
    <>
      {togglePopup && <EventPopup date = {date} location={location} users = {users} capacity = {capacity} host = {host} games = {games} details = {details} togglePopupController={togglePopupController} handlers={handlers} status={status} name={name} id={id}/>}
      <div className={"event event-card " + (status === "joined" ? "event-joined " : "") + (status === "pending" ? "event-pending " : "")} onClick={togglePopupController}>
        <h3>{name}</h3>
        <div className= "event-card-details">
          {game(22, 22)}
          <p>{location}</p>
          {clock(22, 22)}
          <DateString date = {date}/>
        </div>
      </div>
    </>
  )
}

export default EventCard
