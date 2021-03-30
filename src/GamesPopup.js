import React from "react"
import {del} from "./icons.js"

const GamesPopup = ({user_games, closePopup, addGames}) => {

  return (
    <div className="popup-wrapper">
      <div className="popup event-expanded">
      <button className="close button-no-style" onClick={closePopup}>{del(20, 20)}</button>
        <h2>Games Owned</h2>
        <div>
          {user_games.map((game) => (<p>{game}</p>))}
        </div>
        <div className="expanded-bottom-buttons">
          <button onClick={addGames}>Add Games</button>
        </div>
      </div>
    </div>
  )
}
export default GamesPopup
