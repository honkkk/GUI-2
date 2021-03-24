import React from "react"
import EventCard from "./EventCard.js"
import EventBar from "./EventBar.js"
import CategoryCard from "./CategoryCard.js"

const FeedPage = () => {

  let ret = (
    <div>
      {/*A simple typescale to see how headers look*/}
      <h1>Welcome back, username!</h1>
      {/*Event cards that will have overflow scrolling ability*/}
      <section>
        <h2>Your upcoming events</h2>
        <div className="scroll-full-width scroll-event-cards">
          <EventCard location="13 Rockwood Rd Norfolk, MA wqewqewqewqeqwewqewqeqweqweqweqwewqeqwewqeq" name="Event Title,  This title might be long" date="Mon. March 13th"/>
          <EventCard location="13 Rockwood Rd Norfolk, MA" name="Event Title 2" date="Mon. March 33th"/>
          <EventCard location="13 Rockwood Rd Norfolk, MA wqewqewqewqeqwewqewqeqweqweqweqwewqeqwewqeq" name="Event Title,  This title might be long" date="Mon. March 13th"/>
        </div>
      </section>

      <section>
      <h2>Categories</h2>
      <div className="scroll-full-width">
        <CategoryCard img="http://do512family.com/wp-content/uploads/2020/05/FAM_OnlineGames_HERO.jpg" name="Board Games"/>
        <CategoryCard img="https://www.wilsoncenter.org/sites/default/files/styles/embed_text_block/public/media/uploads/images/elh-express-jLNbaNzWGL8-unsplash.jpg" name="Video Games"/>
        <CategoryCard img="https://invisioncommunity.co.uk/wp-content/uploads/2020/02/7-Different-Types-Of-Card-Games.jpg" name="Card Games"/>
        <CategoryCard img="https://lh3.googleusercontent.com/proxy/EyFpCGHp9hFLvelTEivYO_P-KhXvPjS9JbB3eQLiDQ3om-awRRriZSwhBcMmPm6jtqDvCtI7EAI7kPALof_t02pqkMo-H7EF4zoZqcjq61W11B3Y4Nc-Iv0" name="Role Playing"/>
      </div>
      </section>

      {/*Example Event Bars that adapt to the size of the screen*/}
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
