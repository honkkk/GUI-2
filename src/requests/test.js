import React, { useEffect, useState} from "react"
import EventCard from "../event/event-card.js"
import EventBar from "../event/event-bar.js"
import RequestBar from "./requestBar.js"
import { useCookies, CookiesProvider } from 'react-cookie';

const TestPage = ({handlers, sentRequests}) => {
  const [requestData, setRequestData] = useState(null);

  let requestHandler = (id) => {
    setRequestData(requestData.filter(item => item.request != id))
  }

  useEffect(() => {
    if (requestData)
      return;
    let session = handlers.session();
    if (!session)
      return;
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/requests",
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session:session
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



  return (
    <div>
      <h1>Requests</h1>
      <h2>Join requests</h2>
      {
        requestData ?
        requestData.length == 0 ?
          <p>You have no requests to respond to.</p>
        :
        requestData.map((request) => (<RequestBar user = {request.user} event = {request.event} request = {request.request} onRequestChange={requestHandler} getSession={handlers.session}/>))
        : <p>loading...</p>
      }
      <h2>Sent requests</h2>
      {
        sentRequests ?
        sentRequests.length == 0 ?
          <p>You have no pending requests.</p>
        :
        sentRequests.map((request) => (<RequestBar isSent={true} event={request.event} onCancel={handlers.cancel} request={request.request}/>))
        : <p>loading...</p>
      }
    </div>
  )
}

export default TestPage
