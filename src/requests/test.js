import React, { useEffect, useState} from "react"
import EventCard from "../event/event-card.js"
import EventBar from "../event/event-bar.js"
import RequestBar from "./requestBar.js"
import { useCookies, CookiesProvider } from 'react-cookie';

const TestPage = () => {
  const [requestData, setRequestData] = useState(null);
  const [cookies, setCookies, removeCookie] = useCookies(['game1up-user-token']);

  let requestHandler = (id) => {
    setRequestData(requestData.filter(item => item.request != id))
  }

  useEffect(() => {
    if (requestData)
      return;
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/requests",
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
  })

  if (!requestData) {
    return <p>loading...</p>
  }

  if (requestData.length == 0) {
    return <p>No requests right now...</p>
  }

  return (
    <div>
      <h1>Requests</h1>
      {requestData.map((request) => (<RequestBar user = {request.user} event = {request.event} request = {request.request} onRequestChange={requestHandler}/>))}
    </div>
  )
}

export default TestPage
