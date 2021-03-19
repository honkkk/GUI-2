import React, { Component } from "react"
import FeedPage from "./feed.js"
import ProfilePage from "./profile.js"
import TestPage from "./test.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

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
      <Router>
        <div className="App">
          <header className="App-header">
            <nav>
              <ul>
                <li> <NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li> <NavLink exact to="/test" activeClassName="active">Test</NavLink></li>
                <li> <NavLink exact to="/feed" activeClassName="active">Feed</NavLink></li>
                <li> <NavLink exact to="/profile" activeClassName="active">Profile</NavLink></li>
              </ul>
            </nav>
          </header>
          {/*Render body depending on the url path*/}
          <div className="content">
            <Switch>
              <Route path="/test">
                <TestPage />
              </Route>
              <Route path="/feed">
                <FeedPage />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route exact path="/">
                <h1> This is the home page </h1>
              </Route>
            </Switch>
          </div>
        </div>
      </ Router>
    )
  }
}

export default App
