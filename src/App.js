import React, { Component } from "react"
import FeedPage from "./feed.js"
import ProfilePage from "./profile.js"
import TestPage from "./test.js"
import CreatePage from "./create.js"
import SignPage from "./signin.js"
import ProfileSetup from "./profile-setup.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

// This comes from the users cookies -> request to server
var user_data = {
  username:'andrivard4',
  id:'13453423',
  fName:'Andrew',
  lName:'Rivard',
};

// Events the user is part of -> request to server with user_data.id
var user_joined_events = [
  {
    id: '4343423',
    title: 'Game Night',
    short_location: 'Lowell, MA',
    date: 'March 27th',
    status: 'joined'
  },
  {
    id: '32432432',
    title: 'Board Game Time!',
    short_location: 'Norfolk, MA',
    date: 'April 3rd',
    status: 'joined'
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
    status: 'pending'
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
    status: 'joined'
  },
  {
    id: '4343423',
    title: 'Game Night',
    short_location: 'Lowell, MA',
    date: 'March 27th',
    status: 'joined'
  },
  {
    id: '32432432',
    title: 'Board Game Time!',
    short_location: 'Norfolk, MA',
    date: 'April 3rd',
    status: 'joined'
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
    status: 'pending'
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
    status: 'joined'
  }
]

// Our main app component
class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <SignPage/>
            </Route>
            <Route exact path="/profile-setup">
              <ProfileSetup/>
            </Route>
            <Route>
              <header className="App-header">
                <nav>
                  <ul>
                    <li> <NavLink exact to="/test" activeClassName="active">Test</NavLink></li>
                    <li> <NavLink exact to="/feed" activeClassName="active">Feed</NavLink></li>
                    <li> <NavLink exact to="/profile" activeClassName="active">Profile</NavLink></li>
                    <li> <NavLink exact to="/create" activeClassName="active">Create</NavLink></li>
                    <li> <NavLink exact to="/" activeClassName="active">Sign out</NavLink></li>
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
                    <FeedPage user={user_data} upcoming={user_joined_events}/>
                  </Route>
                  <Route path="/profile">
                    <ProfilePage />
                  </Route>
                  <Route path="/create">
                    <CreatePage/>
                  </Route>
                </Switch>
              </div>
            </Route>
          </Switch>
        </div>
      </ Router>
    )
  }
}

export default App
