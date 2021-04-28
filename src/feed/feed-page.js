import React from "react"
import CategoryCard from "../shared/category-card.js"
import EventCardCollection from "../event/event-card-collection.js"
import EventBarCollection from "../event/event-bar-collection.js"
import {useState, useEffect} from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import {sad} from "../shared/icons.js"

const FeedPage = ({user, upcoming, handlers, events}) => {

  // States to handle selected categories and where upcoming events should show
  // NOTE: given time the slider should become its own component
  const [categories, setCategories] = useState([]);

  const [display_events, set_display_events] = useState(events);

  if (!display_events && events ) {
    set_display_events(events);
    console.log(events);
  }


  // Handles changes of what categories are selcted
  const category_select_handler = (id) => {
    let result = categories.filter( (item) => item !== id );
    if (result.length === categories.length)
      result.push(id)
    if (events) {
      if (result.length > 0 ) {
        set_display_events (
          events.filter( (event) => {
            return result.some( (category) => {
              return event.categories[category]
            })
          })
        )
      } else {
        set_display_events(events)
      }
    }
    setCategories(result);
  }


  let ret = (
    <div>
      {/*A simple typescale to see how headers look*/}
      <h1>Welcome back{user && ", " + user.fName}!</h1>
      {/*Event cards that will have overflow scrolling ability*/}
      <section>
        <h2>Your upcoming events</h2>
        {
          upcoming ?
            upcoming.length > 0 ?
              <EventCardCollection events={upcoming} size={3} handlers={handlers}/>
            :
              <div className="no-event">
                <h3> You don't have any upcoming events</h3>
                <Link to='#events'>Join an event here!</Link>
              </div>
          :
            <p>Loading...</p>
        }
      </section>

      <section>
      <h2>Categories</h2>
      <div className="scroll-full-width">
        <CategoryCard id={"board"} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/board.jpg"} name="Board Games"/>
        <CategoryCard id={"video"} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/video.jpg"} name="Video Games"/>
        <CategoryCard id={"card"} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/card.jpg"} name="Card Games"/>
        <CategoryCard id={"rp"} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/rp.jpg"} name="Role Playing"/>
      </div>
      </section>

      {/*Needs to be auto generated....*/}
      <section>
        <h2 id="events">Events around you </h2>
        {
        display_events ?
          display_events.length > 0 ?
            <EventBarCollection handlers={handlers} events={display_events} size={5}/>
          :
            <div className="no-event">
              <h3>No events found</h3>
              {sad(200, 200)}
            </div>
        :
          <p>Loading...</p>
        }
      </section>
    </div>
  )

  return ret;
}

export default FeedPage
