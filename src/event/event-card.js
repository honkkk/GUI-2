import React from "react"
import {game, dice, clock, del, user} from "../shared/icons.js"
import {useState} from 'react';
import EventPopup from './event-popup.js'

// EventCard component is used to show events in a card format
// location       (required, string)     location for an event
// name           (required, string)     name of the event
// date           (required, string(?))  date for the event
// toggleButton   (bool)                 to show button for details or not?
const EventCard = ({location, name, date, status, id}) => {
  const [togglePopup, setTogglePopup] = useState(false);

  const togglePopupController = () => {
    setTogglePopup(!togglePopup);
  }

  return (
    <>
      {togglePopup && <EventPopup togglePopupController={togglePopupController} status={status} name={name} id={id}/>}
      <div className={"event event-card " + (status === "joined" ? "event-joined " : "") + (status === "pending" ? "event-pending " : "")} onClick={togglePopupController}>
        <h3>{name}</h3>
        <div className= "event-card-details">
          {game(22, 22)}
          <p>{location}</p>
          {clock(22, 22)}
          <p>{date}</p>
        </div>
      </div>
    </>
  )
}

export default EventCard
