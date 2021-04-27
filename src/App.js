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

  const [userData, setUserData] = useState(null)
  const [user_joined_events, set_user_joined_events] = useState(null)
  const [user_requested_event_ids, set_user_requested_ids] = useState(null)
  const [requestData, setRequestData] = useState(null);
  const [events, setEvents] = useState(null);

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
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/requests/join/" + event,
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
        throw Error(response.message)
      }
      // if we have an internal error, report it
      if (response.status === "error")
        throw Error(response.message)
      // if operation succeeded
      if (response.status === "success") {
        console.log(response);
        set_user_requested_ids([...user_requested_event_ids, {event:response.message.data.event, request:response.message.ref['@ref'].id}])
        setEvents(events.filter( item => item.id != event))
      }
    })
    .catch(function(error) {
      console.error(error);
    })
  }

  // Sends a request to join an event
  const cancelRequest = (id) => {
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/requests/cancel/" + id,
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
        throw Error(response.message)
      }
      // if we have an internal error, report it
      if (response.status === "error")
        throw Error(response.message)
      // if operation succeeded
      if (response.status === "success") {
        console.log(" test...");
        set_user_requested_ids(user_requested_event_ids.filter(item => item.request != id))
        console.log("Cancled request!");
      }
    })
    .catch(function(error) {
      console.error(error);
    })
  }

  const joinRequestHandler = (id) => {
    setRequestData(requestData.filter(item => item.request != id))
  }

  let getSession = () => {
    if (!cookies.token) {
      if (window.location.pathname !== "/") {
        window.location.pathname = "/"
      }
      return false;
    }
    return cookies.token;
  }

  // Checks for a user session, validates it and grabs the user
  useEffect(() => {
    // If there is no session on the client side have them log in
    let session = getSession()
    if (!session) {
      return;
    }

    // If we havent gotten the user yet, get them
    if (!userData) {
      // If we find a session, check if the server has it and grab the user
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account",
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session
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
    if (userData && userData.status == "complete" && !userData.games) {
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/pref",
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session
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
    if (userData && userData.status == "complete" && !user_joined_events) {
      // Fetch events the user is part of
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/events",
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session
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
              status: 'joined',
              details: item.data.details,
              games: item.data.games,
              capacity: item.data.capacity,
              users: item.data.users
            })
          });
          set_user_joined_events(events)
        }
      })
      .catch(function(error) {
        console.log(error);
      })
    }

    if (!user_requested_event_ids) {
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/requests/sent",
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session
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
          let requests = []
          response.message.forEach((item) => {
            requests.push({event:item.data.event, request:item.ref['@ref'].id})
          });
          set_user_requested_ids(requests)
        }
      })
      .catch(function(error) {
        console.log(error);
      })
    }

    if (!events) {
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/get",
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session
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
          let response_events = []
          response.message.forEach((item) => {
            if (!user_requested_event_ids.find( element => element.event == item.ref['@ref'].id) &&
                !user_joined_events.find( element => element.id == item.ref['@ref'].id)) {
              response_events.push({
                id:item.ref['@ref'].id,
                title:item.data.title,
                short_location: item.data.city + ", " + item.data.state,
                date: item.data.date,
                host: item.data.host,
                details: item.data.details,
                games: item.data.games,
                capacity: item.data.capacity,
                users: item.data.users,
                categories: item.data.categories
              })
            }
          });

          setEvents(response_events);
        }
      })
      .catch(function(error) {
        console.log(error);
      })
    }

    if (!requestData) {
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/requests",
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session:session
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
          let join_requests = []
          response.message.forEach((item) => {
            join_requests.push({user: item.data.sender, event: item.data.event, request: item.ref['@ref'].id})
          });
          setRequestData(join_requests);
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
                    <li> <NavLink exact to="/feed" activeClassName="active">Feed</NavLink></li>
                    <li> <NavLink exact to="/create" activeClassName="active">Create</NavLink></li>
                    <li> <NavLink exact to="/test" activeClassName="active">Requests{(requestData && requestData.length > 0) && " (" + requestData.length + ") "}</NavLink></li>
                    <li> <NavLink exact to="/profile" activeClassName="active">Profile</NavLink></li>
                    <li onClick={()=>{removeCookie("token")}}> <NavLink exact to="/" activeClassName="active">Sign out</NavLink></li>
                  </ul>
                </nav>
              </header>
              {/*Render body depending on the url path*/}
              <div className="content">
                <Switch>
                  <Route path="/test">
                    <TestPage handlers = {{session:getSession, cancel:cancelRequest, join:joinRequestHandler}} sentRequests={user_requested_event_ids} requestData={requestData}/>
                  </Route>
                  <Route path="/feed">
                    <FeedPage handlers={{session:getSession, join:joinEvent}} user={userData} upcoming={user_joined_events} events={events}/> {/*We pass user data and user events here. new events will be fetched in FeedPage*/}
                  </Route>
                  <Route path="/profile">
                    <ProfilePage handlers={{session:getSession}} user_data={userData} upcoming={user_joined_events} addGame={addGame}/>
                  </Route>
                  <Route path="/create">
                    <CreatePage handlers={{session:getSession}}/>
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
