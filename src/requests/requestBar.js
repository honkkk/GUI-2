import React from "react"
import { useCookies, CookiesProvider } from 'react-cookie';

const RequestBar = ({user, event, request, onRequestChange}) => {

  const [cookies, setCookies, removeCookie] = useCookies(['game1up-user-token']);

  let buttonHandler = (isAccept) => {
    console.log(isAccept, user, event, request);
    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/requests/reply/" + request,
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        session:cookies.token,
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

  return (
    <div className = "event request-bars">
      <div className="request-bar">
        <div className = "request-bar-username">
          <h3 >{user}</h3>
        </div>
        <div className="vl-bar"></div>
        <div className = "request-bar-eventname">
          <h3 >{event}</h3>
        </div>
        <div className = "request-bar-buttons">
          <button onClick={()=>buttonHandler(false)} style={{backgroundColor: "#fe5c5c", color:"white"}}><strong>Decline</strong></button>
          <button onClick={()=>buttonHandler(true)}>Accept</button>
        </div>
      </div>
    </div>
  )
}

export default RequestBar
