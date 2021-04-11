import React, { useEffect } from "react"
import FeedPage from "./feed/feed-page.js"
import ProfilePage from "./profile/profile-page.js"
import TestPage from "./test.js"
import CreatePage from "./create/create-page.js"
import SignPage from "./account/account-signup-page.js"
import AccountSetup from "./account/account-setup-page.js"
import { useCookies, CookiesProvider } from 'react-cookie';
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
  state: 'MA',
  city: 'Lowell'
};

//This will have to be implemented somehow, but assuming it would be here for now
var user_games = ["D&D", "monopoly", "exploding kittens", "Chess"]

// Events the user is part of -> request to server with user_data.id
var user_joined_events = [
  {
    id: '4343423',
    title: 'Game Night hosted by thee andre & rivard',
    short_location: 'Lowell, MA',
    date: 'March 27th',
    status: 'joined',
    host: 'andrivard4'
  },
  {
    id: '32432432',
    title: 'Board Game Time!',
    short_location: 'Norfolk, MA',
    date: 'April 3rd',
    status: 'joined',
    host: 'honklover420'
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
    status: 'pending',
    host: 'poojna123'
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am! hosted by ME',
    short_location: '????, ?????',
    date: '????? ?????',
    status: 'joined',
    host: 'andrivard4'
  },
  {
    id: '4343423',
    title: 'Game Night hosted by MEEEE',
    short_location: 'Lowell, MA',
    date: 'March 27th',
    status: 'joined',
    host: 'honklover420'
  },
  {
    id: '32432432',
    title: 'Board Game Time!',
    short_location: 'Norfolk, MA',
    date: 'April 3rd',
    status: 'joined',
    host: 'honklover420'
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
    status: 'pending',
    host: 'honklover420'
  },
  {
    id: '76784345',
    title: 'I don\'t know where I am!',
    short_location: '????, ?????',
    date: '????? ?????',
    status: 'joined',
    host: 'honklover420'
  }
]
const addGame = (games) => {
  alert('A name was submitted: ' + games.join(', '));
}

// Our main app component
const App = () => {

  const [cookies, setCookies, removeCookie] = useCookies(['game1up-user-token']);

  /*useEffect(() => {
    if (!cookies.token) {
      if (window.location.pathname !== "/") {
        console.log(window.location.pathname);
        window.location.pathname = "/"
      }
      return;
    }
    fetch("http://localhost:8888/.netlify/functions/api/account/status",
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
      if (response.status === "error")
        throw Error(response.server_message + ", " + response.error_message)
      if (response.status === "success") {
        if (!response.message) {
          console.log(response.message);
          removeCookie("token");
          window.location.href = './'
        }
      }
    })
    .catch(function(error) {
      removeCookie("token");
      window.location.href = './'
      console.log(error);
    })
  })*/

  if (!cookies.token) {
    return (<div className="App">
      <SignPage/>
    </div>);
  }

  return (
    <Router>
      <CookiesProvider>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <SignPage/>
            </Route>
            <Route exact path="/profile-setup">
              <AccountSetup/>
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
                    <FeedPage user={user_data} upcoming={user_joined_events}/> {/*We pass user data and user events here. new events will be fetched in FeedPage*/}
                  </Route>
                  <Route path="/profile">
                    <ProfilePage user_data = {user_data} user_games ={user_games} upcoming={user_joined_events} addGame = {addGame}/>
                  </Route>
                  <Route path="/create">
                    <CreatePage/>
                  </Route>
                </Switch>
              </div>
            </Route>
          </Switch>
        </div>
      </CookiesProvider>
    </ Router>
  )
}

export default App
