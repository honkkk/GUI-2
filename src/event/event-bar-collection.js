import React from "react"
import EventBar from "./event-bar.js"
import {left_arrow, right_arrow} from "../shared/icons.js"
import {useState} from 'react';


const EventBarCollection = ({events, size=5, handlers}) => {

  const [limit, setLimit] = useState(size);

  let handleLimitChange = () => {
    if (limit+size > events.length)
      setLimit(events.length)
    else
      setLimit(limit+size)
  }

  let rendered_events = [];
  for (var i = 0; i < limit; i++) {
    if (!events[i])
      continue;
    rendered_events.push(<EventBar key={i} users={events[i].users} capacity={events[i].capacity} host = {events[i].host} handlers={handlers} games = {events[i].games} details = {events[i].details} location={events[i].short_location} name={events[i].title} date={events[i].date} id={events[i].id}/>)
  }


  let ret = (
    <>
      {rendered_events}
      {limit < events.length && <button onClick={handleLimitChange}>Show More...</button>}
    </>
  )

  return ret;
}

export default EventBarCollection
