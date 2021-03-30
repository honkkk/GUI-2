import React from "react"
import EventCard from "./event-card.js"
import {left_arrow, right_arrow} from "../shared/icons.js"
import {useState} from 'react';

const EventCardCollection = ({events, size}) => {

  // States to handle selected categories and where upcoming events should show
  // NOTE: given time the slider should become its own component
  const [upcomingIndex, setUpcomingIndex] = useState(0);

  // Renders 3 of the next events to show
  let rendered_upcoming_events = [];
  for (var i = upcomingIndex; i < events.length && i < upcomingIndex + size; i++) {
    rendered_upcoming_events.push(<EventCard key={i} location={events[i].short_location} id={events[i].id} name={events[i].title} date={events[i].date} id={events[i].id} status={events[i].status}/>)
  }

  // Change start index of rendered events
  const left_arrow_handler = () => {
    setUpcomingIndex(upcomingIndex-size)
  }
  const right_arrow_handler = () => {
    setUpcomingIndex(upcomingIndex+size)
  }


  return (
    <div className="scroll-event-cards">
      {/*Only show this button if there are cards to show to the left*/}
      {upcomingIndex != 0 && <button className="button-no-style" onClick={left_arrow_handler}>{left_arrow()}</button>}
      {rendered_upcoming_events}
      {/*Only show this button if there are cards to show to the right*/}
      {upcomingIndex < events.length-size && <button className="button-no-style" onClick={right_arrow_handler}>{right_arrow()}</button>}
    </div>
  )

}

export default EventCardCollection
