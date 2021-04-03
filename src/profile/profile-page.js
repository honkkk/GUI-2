import React from "react"
import UserInfo from "./user-info.js"
import GamesOwned from "./owned-games.js"
import HostedEvents from "./hosted-events"
import {user} from "../shared/icons.js"
import EventCardCollection from "../event/event-card-collection.js"
import GamesPopup from "./games-popup.js"
import AddGamesPopup from "./add-game-popup.js"
import {useState} from 'react';

const ProfilePage = ({user_data ,user_games, upcoming, addGame}) => {
  const [showGamesPopup, setShowGamesPopup] = useState(false)
  const [showAddGamesPopup, setShowAddGamesPopup] = useState(false)
  const [showFilterList, setShowFilterList] = useState(false)

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
  const toggleFilterList = () =>{
    setShowFilterList(!showFilterList)
  }
  let ret = (
    <div className = "profile-background">
      <div className = "profile-page">
        <div><img className = "profile-pic" src={process.env.PUBLIC_URL + "./profilePic.PNG"} /></div>
        <UserInfo name = {user_data.fName +" "+ user_data.lName} userName = {user_data.username} location = {user_data.city +", " + user_data.state}/>
        <div>
      </div>
      <div className = "profile-buttons">
        <button className = "button-no-style" onClick = {toggleGamesPopup}>
          <GamesOwned owned = "7"/>
        </button>
        <div className="vl"></div>
        <button className = "button-no-style" onClick = {toggleFilterList}>
        <HostedEvents hosted = "1"/>
        </button>
      </div>
      </div>
      <section>
        {(!showFilterList) && <EventCardCollection events={upcoming} size={3} />}
      </section>
      <section>
        {(showFilterList) && <EventCardCollection events={upcoming.filter((upcoming) => upcoming.host === user_data.username)} size={3} />}
      </section>
      {showGamesPopup && <GamesPopup user_games = {user_games} closePopup = {toggleGamesPopup} addGames={toggleAddGamesPopup}/>}
      {showAddGamesPopup && <AddGamesPopup addGame = {addGame} closePopup ={closeAddGamesPopup}/>}
    </div>
  )

  return ret;
}

export default ProfilePage
