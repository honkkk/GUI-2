import React from "react"

const HostedEvents = ({hosted}) => {

  let ret = (
    <div style={{textAlign : "center"}}>
      <h2>Hosted Events</h2>
      <h2>({hosted})</h2>
    </div>
  )

  return ret;
}

export default HostedEvents
