import React from "react"
import UserInfo from "./user-info.js"
import GamesOwned from "./owned-games.js"
import HostedEvents from "./hosted-events"
import {user} from "../shared/icons.js"
import EventCardCollection from "../event/event-card-collection.js"
import GamesPopup from "./games-popup.js"
import AddGamesPopup from "./add-game-popup.js"
import {useState} from 'react';

const ProfilePage = ({user_games, upcoming}) => {
  const [showGamesPopup, setShowGamesPopup] = useState(false)
  const [showAddGamesPopup, setShowAddGamesPopup] = useState(false)

  const toggleGamesPopup  = () =>{
    setShowGamesPopup(!showGamesPopup)
  }
  const toggleAddGamesPopup = () =>{
    setShowGamesPopup(!showGamesPopup)
    setShowAddGamesPopup(!showAddGamesPopup)
  }
  const closeAddGamesPopup = () =>{
    setShowAddGamesPopup(!showAddGamesPopup)
  }

  let ret = (
    <div className = "profile-background">
      <div className = "profile-page">
        <div><img className = "profile-pic" src={process.env.PUBLIC_URL + "./profilePic.PNG"} /></div>
        <UserInfo name = "John Smith" userName = "JSmitty123" location = "Lowell, MA"/>
        <div>
      </div>
      <div className = "profile-buttons">
        <button className = "button-no-style" onClick = {toggleGamesPopup}>
          <GamesOwned owned = "7"/>
        </button>
        <div className="vl"></div>
        <HostedEvents hosted = "1"/>
      </div>
      </div>
      <section>
        <EventCardCollection events={upcoming} size={3} />
      </section>
      {showGamesPopup && <GamesPopup user_games = {user_games} closePopup = {toggleGamesPopup} addGames={toggleAddGamesPopup}/>}
      {showAddGamesPopup && <AddGamesPopup closePopup ={closeAddGamesPopup}/>}
    </div>
  )

  return ret;
}

export default ProfilePage
