import React, { useEffect, useState} from "react"
import FeedPage from "./feed/feed-page.js"
import ProfilePage from "./profile/profile-page.js"
import TestPage from "./requests/test.js"
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

// Our main app component
const App = () => {

  const [userData, setUserData] = useState({})
  const [user_joined_events, set_user_joined_events] = useState(null)

  const [cookies, setCookies, removeCookie] = useCookies(['game1up-user-token']);

  // Events the user is part of -> request to server with user_data.id
  const addGame = (games) => {
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/games",
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session:cookies.token,
        games:games
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      if (response.status === null) {
        throw Error(response.statusText)
      }
      // if we have an internal error, report it
      if (response.status === "error")
        throw Error(response.server_message + ", " + response.error_message)
      // if operation succeeded
      if (response.status === "success") {
        setUserData({...userData, games:[...userData.games, ...games]})
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  // Sends a request to join an event
  const joinEvent = (event) => {
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/join/" + event['@ref'].id,
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
    .then( function(response) {
      if (response.status === null) {
        throw Error(response.statusText)
      }
      // if we have an internal error, report it
      if (response.status === "error")
        throw Error(response.server_message + ", " + response.error_message)
      // if operation succeeded
      if (response.status === "success") {
        console.log(response.message);
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  let event_handlers = {join: joinEvent}

  // Checks for a user session, validates it and grabs the user
  useEffect(() => {
    // If there is no session on the client side have them log in
    if (!cookies.token) {
      if (window.location.pathname !== "/") {
        setUserData({})
        window.location.pathname = "/"
      }
      return;
    }

    // If we havent gotten the user yet, get them
    if (!userData.email) {
      // If we find a session, check if the server has it and grab the user
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account",
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
        // if we have an internal error, report it
        if (response.status === "error")
          throw Error(response.server_message + ", " + response.error_message)
        // if operation succeeded
        if (response.status === "success") {
          // We did not find the session or user, so remove the token as its fake or expired
          if (!response.message) {
            removeCookie("token");
            window.location.href = './'
          } else {
            // we found the user, so set the user's info
            setUserData({
              ...userData,
              fName:response.message.data.fName,
              lName:response.message.data.lName,
              username:response.message.data.username,
              email:response.message.data.email,
              birth: new Date(response.message.data.birth),
              status: response.message.data.status,
              id: response.message.ref['@ref'].id
            })
          }
        }
      })
      .catch(function(error) {
        removeCookie("token");
        window.location.href = './'
        console.log(error);
      })
    }
    // If the user's account is set up, get the preferences for it
    if (userData.status == "complete" && !userData.games) {
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/pref",
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
        // if we have an internal error, report it
        if (response.status === "error")
          throw Error(response.server_message + ", " + response.error_message)
        // if operation succeeded
        if (response.status === "success") {
          setUserData({
            ...userData,
            categories: response.message.categories? response.message.categories : [],
            games: response.message.games? response.message.games: [],
            locations: response.message.locations ? response.message.locations :[]
          })
        }
      })
      .catch(function(error) {
        removeCookie("token");
        window.location.href = './'
        console.log(error);
      })
    }

    // If the user's account is set up, get the preferences for it
    if (userData.status == "complete" && !user_joined_events) {
      // Fetch events the user is part of
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/events",
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
        // if we have an internal error, report it
        if (response.status === "error")
          throw Error(response.server_message + ", " + response.error_message)
        // if operation succeeded
        if (response.status === "success") {
          let events = []
          response.message.forEach((item, i) => {
            events.push({
              id: item.ref['@ref'].id,
              title: item.data.title,
              short_location: item.data.city + ", " + item.data.state,
              date: item.data.date,
              host: item.data.host,
              status: 'joined'
            })
          });
          set_user_joined_events(events)
        }
      })
      .catch(function(error) {
        console.log(error);
      })
    }
  })

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
                    <li onClick={()=>{removeCookie("token")}}> <NavLink exact to="/" activeClassName="active">Sign out</NavLink></li>
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
                    <FeedPage handlers={event_handlers} user={userData} upcoming={user_joined_events? user_joined_events : []}/> {/*We pass user data and user events here. new events will be fetched in FeedPage*/}
                  </Route>
                  <Route path="/profile">
                    <ProfilePage user_data={userData} upcoming={user_joined_events? user_joined_events : []} addGame = {addGame}/>
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
