import React from "react"
import UserInfo from "./UserInfo.js"
import EventCard from "./EventCard.js"
import GamesOwned from "./gamesOwned.js"
import HostedEvents from "./hostedEvents"
import {user} from "./icons.js"
import ProfilePic from "./profilePic.PNG"
import EventCardSlider from "./EventCardSlider.js"
import GamesPopup from "./GamesPopup.js"
import AddGamesPopup from "./AddGamesPopup"
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
        <div><img className = "profile-pic" src={ProfilePic} /></div>
        <UserInfo name = "John Smith" userName = "JSmitty123" location = "Lowell, MA"/>
        <div>
      </div>
      <div className = "profile-buttons">
        <button className = "button-no-style" onClick = {toggleGamesPopup}>
          <GamesOwned owned = "7"/>
        </button>
        <div class="vl"></div>
        <HostedEvents hosted = "1"/>
      </div>
      </div>
      <section>
        <EventCardSlider events={upcoming} size={3} />
      </section>
      {showGamesPopup && <GamesPopup user_games = {user_games} closePopup = {toggleGamesPopup} addGames={toggleAddGamesPopup}/>}
      {showAddGamesPopup && <AddGamesPopup closePopup ={closeAddGamesPopup}/>}
    </div>
  )

  return ret;
}

export default ProfilePage
