import React, { Component } from "react"
import EventCard from "./EventCard.js"
import EventBar from "./EventBar.js"

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Testing 1</h1>
          <h2>Testing 2</h2>
          <h3>Testing 3</h3>
          <p>Testing p</p>
          <div className="scroll-full-width scroll-event-cards">
            <EventCard location="13 Rockwood Rd Norfolk, MA wqewqewqewqeqwewqewqeqweqweqweqwewqeqwewqeq" name="Event Title,  This title might be long" date="Mon. March 13th"/>
            <EventCard location="13 Rockwood Rd Norfolk, MA" name="Event Title 2" date="Mon. March 33th"/>
            <EventCard location="13 Rockwood Rd Norfolk, MA wqewqewqewqeqwewqewqeqweqweqweqwewqeqwewqeq" name="Event Title,  This title might be long" date="Mon. March 13th"/>
          </div>
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
