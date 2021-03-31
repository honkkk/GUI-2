import React from "react"
import {useState} from 'react';
import {del} from "../shared/icons.js"

const OwnedGames = ({nextHandler, backHandler, addGameHandler, removeGameHandler, gameList}) => {

  // Renders the game and location lists
  var gameListRendered = [];
  for (var i = 0; i < gameList.length; i++) {
    gameListRendered.push(
      (
        <div key={i} data-index={i} className="game-title-list-card">
          <p>{gameList[i]}</p>
          <button className="button-no-style" onClick={removeGameHandler}>{del(15, 15)}</button>
        </div>)
    );
  }

  // All the sections that will be rendered to the user. Display order depends on the value of current
  return (<>
    <h3>What are some games you own?</h3>
    <div className="submit-field">
      <label>
        <p> Title </p>
        <input type="text" id="game-title-profile-setup"/>
      </label>
      <button onClick={addGameHandler}> <p>Add</p> </button>
    </div>
    {gameListRendered}
    <button className="setup-next" onClick={backHandler}>Back</button>
    <button className="setup-next" onClick={nextHandler}>Next</button>
  </>)

}

export default OwnedGames
