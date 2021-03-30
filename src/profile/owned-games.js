import React from "react"

const GamesOwned = ({owned}) => {

  let ret = (
    <div style={{textAlign : "center"}}>
      <h2>Games Owned</h2>
      <h2>({owned})</h2>
    </div>
  )

  return ret;
}

export default GamesOwned
