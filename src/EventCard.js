import React from "react"
import {game, dice, clock} from "./icons.js"

const EventCard = ({location, name, date}) => {

  return (
    <div className="event event-card" style={{'border-top': '5px solid green'}}>
      <h3>{name}</h3>
      <div className= "event-card-details">
        {game(22, 22)}
        <p>{location}</p>
        {clock(22, 22)}
        <p>{date}</p>
      </div>
    </div>
  )
}

export default EventCard
