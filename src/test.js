import React from "react"
import EventCard from "./EventCard.js"
import EventBar from "./EventBar.js"

const TestPage = () => {

  let ret = (
    <div>
      {/*A simple typescale to see how headers look*/}
      <h1>Testing 1</h1>
      <h2>Testing 2</h2>
      <h3>Testing 3</h3>
      <p>Testing p</p>
      {/*Event cards that will have overflow scrolling ability*/}
      <div className="scroll-full-width scroll-event-cards">
        <EventCard location="13 Rockwood Rd Norfolk, MA wqewqewqewqeqwewqewqeqweqweqweqwewqeqwewqeq" name="Event Title,  This title might be long" date="Mon. March 13th"/>
      </div>
      {/*Example Event Bars that adapt to the size of the screen*/}
      <EventBar />
    </div>
  )

  return ret;
}

export default TestPage
