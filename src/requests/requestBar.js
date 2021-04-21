import React from "react"

const RequestBar = ({userName, eventName}) => {
  return (
    <div className = "event request-bars">
      <div className="request-bar">
        <div className = "request-bar-username">
          <h3 >{userName}</h3>
        </div>
        <div className="vl-bar"></div>
        <div className = "request-bar-eventname">
          <h3 >{eventName}</h3>
        </div>
        <div className = "request-bar-buttons">
          <button style={{backgroundColor: "#fe5c5c", color:"white"}}><strong>Decline</strong></button>
          <button >Accept</button>
        </div>
      </div>
    </div>
  )
}

export default RequestBar
