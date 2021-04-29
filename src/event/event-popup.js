import React from "react"
import {game, clock, user, del} from "../shared/icons.js"
import UserList from "../shared/user-list.js"
import {useState} from 'react';
import DateString from "../shared/date-string.js"

// EventBar component is used to show events in a bar format
// location       (required, string)     location for an event
// name           (required, string)     name of the event
// date           (required, string(?))  date for the event
// users          (required, [user])     a list of the users at the event
const EventPopup = ({users, date, location, capacity, host, togglePopupController, games, details, status, name, id, handlers}) => {

  let [usernames, setUsernames] = useState();

  let temp_usernames = [];

  let session = handlers.session()
  if (!session) {
    // Kick them out...
  }

  if(!usernames) {
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/gets",
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session,
        ids:[host, ...users]
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
        throw Error(response.message)
      // if operation succeeded
      if (response.status === "success") {
        setUsernames(response.message)
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }




  return (
    <div className="popup-wrapper">
      <div className="popup event-expanded">
        <button className="close button-no-style" onClick={togglePopupController}>{del(20, 20)}</button>
        <h2> {name} </h2>
        <div className="event-expanded-tags">
          {game(26, 26)}
          <p>{location}</p>
          {clock(26, 26)}
          <DateString date = {date}/>
        </div>
        <p>{details}</p>
        <div className="line"></div>
        <h3>Games</h3>
        <div>
          {games.map((game) => (<p>{game}</p>))}
        </div>
        <div className="line"></div>
        <h3>Participants ({users.length + 1}/{capacity})</h3>
        <div className="expanded-participants">
          {!usernames ? <p>Loading users...</p>:  usernames.map((username, i) => ([<div>{user(20, 20)}</div>,<p>{username}{i==0 && " (Host)"}</p>]))}
        </div>
        <div className="expanded-bottom-buttons">
          {!status && <button className="join" onClick={
            (e) => {
              var loader = document.createElement('div');
              loader.classList.add('loader');
              e.target.parentNode.replaceChild(loader, e.target)
              handlers.join(id)
            }
          }><p>Join</p></button>}
        </div>
      </div>
    </div>
  )
}

export default EventPopup
