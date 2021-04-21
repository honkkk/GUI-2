import React from "react"
import {game, clock, user, del} from "../shared/icons.js"
import UserList from "../shared/user-list.js"
import {useState} from 'react';

// EventBar component is used to show events in a bar format
// location       (required, string)     location for an event
// name           (required, string)     name of the event
// date           (required, string(?))  date for the event
// users          (required, [user])     a list of the users at the event
const EventPopup = ({togglePopupController, status, name, id, handlers}) => {

  let users = ["A", "B", "C", "D", "E"];

  return (
    <div className="popup-wrapper">
      <div className="popup event-expanded">
        <button className="close button-no-style" onClick={togglePopupController}>{del(20, 20)}</button>
        <h2> {name} </h2>
        <div className="event-expanded-tags">
          {game(26, 26)}
          <p>13 Rockwood Rd Norfolk, MA </p>
          {clock(26, 26)}
          <p>Mon. March 13th </p>
        </div>
        <p>The user can give a dumpling? about what this gamenight will be like, along with things they want to do, what they expect from others, and other details like food/ drinks or something like that.</p>
        <div className="line"></div>
        <h3>Games</h3>
        <ul>
          <li><p>Catan</p></li>
          <li><p>Super Smash Bros Ultimate</p></li>
          <li><p>Munchkins</p></li>
          <li><p>Cards Against Humanity</p></li>
          <li><p>Betrayal at House on the Hill w/ Widow's Walk</p></li>
          <li><p>Mario Kart 8</p></li>
        </ul>
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
          <p>Username (Host)</p>
          <p>18</p>
          <p>3</p>
          <div>
            {user(20, 20)}
          </div>
          <p>Username</p>
          <p>19</p>
          <p>2</p>
        </div>
        <div className="expanded-bottom-buttons">
          <button><p>...</p></button>
          {status==='joined' && <button><p>Leave</p></button>}
          {status==='pending' && <button><p>Cancel</p></button>}
          {!status && <button onClick={() => {handlers.join(id)}}><p>Join</p></button>}
        </div>
      </div>
    </div>
  )
}

export default EventPopup
