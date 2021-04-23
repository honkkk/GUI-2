import React from "react"
import CategoryCard from "../shared/category-card.js"
import EventCardCollection from "../event/event-card-collection.js"
import EventBarCollection from "../event/event-bar-collection.js"
import {useState, useEffect} from 'react';

const FeedPage = ({user, upcoming, handlers, events}) => {

  // States to handle selected categories and where upcoming events should show
  // NOTE: given time the slider should become its own component
  const [categories, setCategories] = useState([]);


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
      <h1>Welcome back{user && ", " + user.fName}!</h1>
      {/*Event cards that will have overflow scrolling ability*/}
      <section>
        <h2>Your upcoming events</h2>
        {upcoming ? <EventCardCollection events={upcoming} size={3} handlers={handlers}/> : <p>Loading...</p>}
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
        {events ? <EventBarCollection handlers={handlers} events={events} size={5}/> : <p>Loading...</p>}
      </section>
    </div>
  )

  return ret;
}

export default FeedPage
