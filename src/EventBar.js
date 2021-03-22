import React from "react"
import {game, dice, clock, user, del} from "./icons.js"
import UserList from "./userList.js"
import {useState} from 'react';

// EventBar component is used to show events in a bar format
// location       (required, string)     location for an event
// name           (required, string)     name of the event
// date           (required, string(?))  date for the event
// users          (required, [user])     a list of the users at the event
const EventCard = () => {

  const [togglePopup, setTogglePopup] = useState(false);

  let users = ["A", "B", "C", "D", "E"];

  const togglePopupController = () => {
    setTogglePopup(!togglePopup);
  }

  let details = (
    <div className="popup-wrapper">
      <div className="popup event-expanded">
        <button className="close button-no-style" onClick={togglePopupController}>{del(20, 20)}</button>
        <h2> This is where the title for the event goes! </h2>
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
          <button><p>Join</p></button>
        </div>
      </div>
    </div>
  )

  let ret = (
    <>
      {togglePopup && details}
      <div className="event event-bar">
        <button className="event-bar-expand" onClick={togglePopupController}> <p>Details</p></button>
        <div className="event-user-status user-icon-list">
          <UserList users={users} maxShown={2}/>
        </div>
        <div className="event-bar-title">
          <h3> Event Title Goes Here</h3>
        </div>
        <div className="event-bar-details">
          {dice(22, 22)}
          <p>List of some games, This list can be long, if it's too long, cut it off, etc. </p>
          {game(22, 22)}
          <p>13 Rockwood Rd Norfolk, MA </p>
          {clock(22, 22)}
          <p>Mon. March 13th </p>
        </div>
      </div>
    </>
  )

  return ret;
}

export default EventCard
