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

  console.log("rendering new popup for " + name);

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
        <h3>Participants (3/6)</h3>
        <div className="expanded-participants">
          <div></div>
          <p style={{'fontWeight':'bold'}}> Username </p>
          <p style={{'fontWeight':'bold'}}> Age</p>
          <p style={{'fontWeight':'bold'}}> Gamenights Participated </p>
          <div>
            {user(20, 20)}
          </div>
          <p>(host) {host}</p>
          <p>18</p>
          <p>3</p>
          {users.map((username) => ([<div>{user(20, 20)}</div>,<p>{username}</p>, <p>19</p>,<p>5</p>]))}
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
