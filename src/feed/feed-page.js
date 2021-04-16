import React from "react"
import CategoryCard from "../shared/category-card.js"
import EventCardCollection from "../event/event-card-collection.js"
import EventBarCollection from "../event/event-bar-collection.js"
import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';

const FeedPage = ({user, upcoming}) => {

  // States to handle selected categories and where upcoming events should show
  // NOTE: given time the slider should become its own component
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState(null);
  const [cookies, setCookies, removeCookie] = useCookies(['game1up-user-token']);

  useEffect( () => {
    if (events) return;
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/get",
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session:cookies.token
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      if (response.status === null) {
        throw Error(response.statusText)
      }
      // if we have an internal error, report it
      if (response.status === "error")
        throw Error(response.server_message + ", " + response.error_message)
      // if operation succeeded
      if (response.status === "success") {
        // We did not find the session or user, so remove the token as its fake or expired
        let response_events = []
        response.message.forEach((item) => {
          response_events.push({
            id:item.ref,
            title:item.data.title,
            short_location: item.data.city + ", " + item.data.state,
            date: item.data.date
          })
        });

        setEvents(response_events);
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  })


  // Handles changes of what catigories are selcted
  const category_select_handler = (id) => {
    let result = categories.filter( (item) => item !== id );
    if (result.length === categories.length)
      result.push(id)
    setCategories(result);
  }


  let ret = (
    <div>
      {/*A simple typescale to see how headers look*/}
      <h1>Welcome back, {user.fName}!</h1>
      {/*Event cards that will have overflow scrolling ability*/}
      <section>
        <h2>Your upcoming events</h2>
        <EventCardCollection events={upcoming} size={3} />
      </section>

      <section>
      <h2>Categories</h2>
      <div className="scroll-full-width">
        <CategoryCard id={0} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/board.jpg"} name="Board Games"/>
        <CategoryCard id={1} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/video.jpg"} name="Video Games"/>
        <CategoryCard id={2} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/card.jpg"} name="Card Games"/>
        <CategoryCard id={3} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/rp.jpg"} name="Role Playing"/>
      </div>
      </section>

      {/*Needs to be auto generated....*/}
      <section>
        <h2>Events around you </h2>
        <EventBarCollection events={events? events : []} size={5}/>
      </section>
    </div>
  )

  return ret;
}

export default FeedPage
