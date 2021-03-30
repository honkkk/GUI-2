import React from "react"
import {del, add} from "../shared/icons.js"

const AddGamesPopup = ({closePopup}) => {

  return (
    <div className="popup-wrapper">
      <div className="popup event-expanded">
      <button className="close button-no-style" onClick={closePopup}>{del(20, 20)}</button>
        <h2>Add Games</h2>
        <div className = "create-input">
          <label>Game 1:</label>
          <input type="text" placeholder="Game 1"></input>
        </div>
        <div className = "add-game">
          <button className = "button-no-style">
            <p> Add Game</p>{add(20,20)}
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddGamesPopup
