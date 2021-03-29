import React from "react"
import EventCard from "./EventCard.js"
import EventBar from "./EventBar.js"
import CategoryCard from "./CategoryCard.js"
import EventCardSlider from "./EventCardSlider.js"
import {left_arrow, right_arrow} from "./icons.js"
import {useState} from 'react';

// list of events for the user
var events = [
  {
    id: '4343423',
    title: 'Game Night',
    short_location: 'Lowell, MA',
    date: 'March 27th',
  },
  {
    id: '32432432',
    title: 'Board Game Time!',
    short_location: 'Norfolk, MA',
    date: 'April 3rd',
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
  },
  {
    id: '4343423',
    title: 'Game Night',
    short_location: 'Lowell, MA',
    date: 'March 27th',
  },
  {
    id: '32432432',
    title: 'Board Game Time!',
    short_location: 'Norfolk, MA',
    date: 'April 3rd',
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
  }
]

const FeedPage = ({user, upcoming}) => {

  // States to handle selected categories and where upcoming events should show
  // NOTE: given time the slider should become its own component
  const [categories, setCategories] = useState([]);

  let rendered_events = [];
  for (var i = 0; i < events.length; i++) {
    rendered_events.push(<EventBar key={i} location={events[i].short_location} name={events[i].title} date={events[i].date} id={events[i].id}/>)
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
        <EventCardSlider events={upcoming} size={3} />
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
        {rendered_events}
      </section>
    </div>
  )

  return ret;
}

export default FeedPage
