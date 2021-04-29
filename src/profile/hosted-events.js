import React from "react"

const HostedEvents = ({hosted, show, count}) => {
  if (!show) {
    return (
      <div style={{textAlign : "center"}}>
        <h2>Show Hosted</h2>
        <h2>Events ({hosted})</h2>
      </div>
    )
  }

  return (
    <div style={{textAlign : "center"}}>
      <h2>Show All </h2>
      <h2>Events ({count})</h2>
    </div>
  )
}

export default HostedEvents
