import React from "react"
import {useState} from "react"

const RequestBar = ({user, event, request, onRequestChange, isSent, onCancel, getSession}) => {

  const [loading, setLoading] = useState(false)

  const [eventName, setEventName] = useState("Loading event name...")
  const [userName, setUserName] = useState("Loading sender name...")

  let session = getSession()
  if (!session) {
    // Kick them out...
  }

  let buttonHandler = (isAccept) => {

    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/requests/reply/" + request,
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session,
        status: isAccept?"accept":"deny"
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
        onRequestChange(request)
      }
    })
    .catch(function(error) {
      console.log(error);
    })

  }

  fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/get/" + event,
  {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      session,
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
      throw Error(response.message)
    // if operation succeeded
    if (response.status === "success") {
      setEventName(response.message.title)
    }
  })
  .catch(function(error) {
    console.log(error);
  })

  if (!isSent) {
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/get/" + user,
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session,
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
        throw Error(response.message)
      // if operation succeeded
      if (response.status === "success") {
        setUserName(response.message.username)
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }

  return (
    <div className = "event request-bars">
      <div className="request-bar">
        <div className = "request-bar-username">
          <h3 >{isSent ? eventName: userName}</h3>
        </div>
        {!isSent &&
          <>
            <div className={!isSent? "vl-bar " : "vl-bar-hidden"}></div>
            <div className = "request-bar-eventname">
              <h3 >{eventName}</h3>
            </div>
          </>
        }
        <div className = "request-bar-buttons">
        {loading? <div className="loader"></div> : isSent ?
          <button onClick={(e)=>{setLoading(true);onCancel(request)}}>Cancel</button> :
          <><button onClick={(e)=>{setLoading(true);buttonHandler(false)}} style={{backgroundColor: "#fe5c5c", color:"white"}}><strong>Decline</strong></button>
          <button onClick={(e)=>{setLoading(true);buttonHandler(true)}}>Accept</button></>
        }
        </div>
      </div>
    </div>
  )
}

export default RequestBar
