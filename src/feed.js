import React from "react"
import EventCard from "./EventCard.js"
import EventBar from "./EventBar.js"
import CategoryCard from "./CategoryCard.js"
import {left_arrow, right_arrow} from "./icons.js"
import {useState} from 'react';

const FeedPage = ({user, upcoming}) => {

  // States to handle selected categories and where upcoming events should show
  // NOTE: given time the slider should become its own component
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [categories, setCategories] = useState([]);

  // Renders 3 of the next events to show
  let rendered_upcoming_events = [];
  for (var i = upcomingIndex; i < upcoming.length && i < upcomingIndex + 3; i++) {
    rendered_upcoming_events.push(<EventCard key={i} location={upcoming[i].short_location} name={upcoming[i].title} date={upcoming[i].date} id={upcoming[i].id} status={upcoming[i].status}/>)
  }

  // Change start index of rendered events
  const left_arrow_handler = () => {
    setUpcomingIndex(upcomingIndex-3)
  }
  const right_arrow_handler = () => {
    setUpcomingIndex(upcomingIndex+3)
  }

  // Handles changes of what catigories are selcted
  const category_select_handler = (id) => {
    let result = categories.filter( (item) => item != id );
    if (result.length == categories.length)
      result.push(id)
    setCategories(result);
    console.log(result);
  }


  let ret = (
    <div>
      {/*A simple typescale to see how headers look*/}
      <h1>Welcome back, {user.fName}!</h1>
      {/*Event cards that will have overflow scrolling ability*/}
      <section>
        <h2>Your upcoming events</h2>
        <div className="scroll-event-cards">
          {/*Only show this button if there are cards to show to the left*/}
          {upcomingIndex != 0 && <button className="button-no-style" onClick={left_arrow_handler}>{left_arrow()}</button>}
          {rendered_upcoming_events}
          {/*Only show this button if there are cards to show to the right*/}
          {upcomingIndex < upcoming.length-3 && <button className="button-no-style" onClick={right_arrow_handler}>{right_arrow()}</button>}
        </div>
      </section>

      <section>
      <h2>Categories</h2>
      <div className="scroll-full-width">
        <CategoryCard id={0} onSelect={category_select_handler} img="http://do512family.com/wp-content/uploads/2020/05/FAM_OnlineGames_HERO.jpg" name="Board Games"/>
        <CategoryCard id={1} onSelect={category_select_handler} img="https://www.wilsoncenter.org/sites/default/files/styles/embed_text_block/public/media/uploads/images/elh-express-jLNbaNzWGL8-unsplash.jpg" name="Video Games"/>
        <CategoryCard id={2} onSelect={category_select_handler} img="https://invisioncommunity.co.uk/wp-content/uploads/2020/02/7-Different-Types-Of-Card-Games.jpg" name="Card Games"/>
        <CategoryCard id={3} onSelect={category_select_handler} img="https://lh3.googleusercontent.com/proxy/EyFpCGHp9hFLvelTEivYO_P-KhXvPjS9JbB3eQLiDQ3om-awRRriZSwhBcMmPm6jtqDvCtI7EAI7kPALof_t02pqkMo-H7EF4zoZqcjq61W11B3Y4Nc-Iv0" name="Role Playing"/>
      </div>
      </section>

      {/*Needs to be auto generated....*/}
      <section>
      <h2>Events around you </h2>
        <EventBar />
        <EventBar />
        <EventBar />
        <EventBar />
      </section>
    </div>
  )

  return ret;
}

export default FeedPage
