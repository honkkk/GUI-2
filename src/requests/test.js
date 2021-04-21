import React from "react"
import EventCard from "../event/event-card.js"
import EventBar from "../event/event-bar.js"
import RequestBar from "./requestBar.js"

const TestPage = () => {

  let data =[{
    "userName" : "andriv1",
    "eventName" : "event1",
  },
  {
    "userName" : "andriv2",
    "eventName" : "event2 with a super duper long name woot woot howdy doo",
  },
  {
    "userName" : "andriv3",
    "eventName" : "event3",
  },
  {
    "userName" : "Person_with_a_riduclously_long_username",
    "eventName" : "event4",
  }];
  let ret = (
    <div>
      <h1>Requests</h1>
      {data.map((request) => (<RequestBar userName = {request["userName"]} eventName = {request["eventName"]}/>))}
    </div>
  )

  return ret;
}

export default TestPage
