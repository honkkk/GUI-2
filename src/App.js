import React, { Component } from "react"
import EventCard from "./EventCard.js"
import EventBar from "./EventBar.js"

// Temp data for events... This will all be tossed into a DB at some point
var tempEvents = [
  {
    title:'EPIC GAME NIGHT FUN',
    date:'Some time',
    location: 'Lowell, MA',
    host: 'Andrew',
    participants: [
      'Eric',
      'Cassie',
      'Tzur'
    ],
    categories: [
      "Board Game",
      "Video Game"
    ],
    games: [
      'Catan',
      'Smash Bros'
    ],
    capacity: 10,
  },
  {
    title:'Gaymer Night',
    date:'Some time',
    location: 'Lowell, MA',
    host: 'Andrew',
    participants: [
      'Eric',
      'Cassie',
      'Tzur'
    ],
    categories: [
      "Board Game",
      "Video Game"
    ],
    games: [
      'Catan',
      'Smash Bros'
    ],
    capacity: 10,
  },
  {
    title:'plz join my gamenight... please',
    date:'Some time',
    location: 'Lowell, MA',
    host: 'Andrew',
    participants: [
      'Eric',
      'Cassie',
      'Tzur'
    ],
    categories: [
      "Board Game",
      "Video Game"
    ],
    games: [
      'Catan',
      'Smash Bros'
    ],
    capacity: 10,
  }
];

// Our main app component
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*A simple typescale to see how headers look*/}
          <h1>Testing 1</h1>
          <h2>Testing 2</h2>
          <h3>Testing 3</h3>
          <p>Testing p</p>
          {/*Event cards that will have overflow scrolling ability*/}
          <div className="scroll-full-width scroll-event-cards">
            <EventCard location="13 Rockwood Rd Norfolk, MA wqewqewqewqeqwewqewqeqweqweqweqwewqeqwewqeq" name="Event Title,  This title might be long" date="Mon. March 13th"/>
            <EventCard location="13 Rockwood Rd Norfolk, MA" name="Event Title 2" date="Mon. March 33th"/>
            <EventCard location="13 Rockwood Rd Norfolk, MA wqewqewqewqeqwewqewqeqweqweqweqwewqeqwewqeq" name="Event Title,  This title might be long" date="Mon. March 13th"/>
          </div>
          {/*Example Event Bars that adapt to the size of the screen*/}
          <EventBar />
          <EventBar />
          <EventBar />
          <EventBar />
        </header>
      </div>
    )
  }
}

export default App
