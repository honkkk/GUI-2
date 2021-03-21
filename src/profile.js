import React from "react"
import UserInfo from "./UserInfo.js"
import EventCard from "./EventCard.js"
import GamesOwned from "./gamesOwned.js"
import HostedEvents from "./hostedEvents"
import {user} from "./icons.js"
import ProfilePic from "./profilePic.PNG"

const ProfilePage = () => {

  let ret = (
    <div className = "profile-background">
      <div className = "profile-page">
        <div><img className = "profile-pic" src={ProfilePic} /></div>
        <UserInfo name = "John Smith" userName = "JSmitty123" location = "Lowell, MA"/>
        <div>
      </div>
      <div className = "profile-buttons">
      <GamesOwned owned = "7"/><div class="vl"></div><HostedEvents hosted = "1"/>
      </div>
      </div>
      <div className="scroll-full-width scroll-event-cards">
        <EventCard location="13 Rockwood Rd Norfolk, MA wqewqewqewqeqwewqewqeqweqweqweqwewqeqwewqeq" name="Event Title,  This title might be long" date="Mon. March 13th"/>
        <EventCard location="13 Rockwood Rd Norfolk, MA" name="Event Title 2" date="Mon. March 33th"/>
        <EventCard location="13 Rockwood Rd Norfolk, MA wqewqewqewqeqwewqewqeqweqweqweqwewqeqwewqeq" name="Event Title,  This title might be long" date="Mon. March 13th"/>
      </div>
    </div>
  )

  return ret;
}

export default ProfilePage
