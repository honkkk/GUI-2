import React from "react"
import {del, add} from "../shared/icons.js"
import {useState} from 'react';

const AddGamesPopup = ({closePopup, addGame}) => {
  const [games, setGames] = useState([]);
  const submitGames = (addGame) =>{

  }

  const removeClick = (e) => {
    setGames(games.filter( (item, index) => index !=e.target.parentElement.dataset.index));
  }

  var createInputs = games.map(( el,i) => (
      <div key={"gaymer-" + i} className = "create-input" data-index={i}>
        <input type="text" data-index={i} value = {el} onChange={handleChange} />
        <button data-index={i} className = "button-no-style" onClick={removeClick}>REMOVE</button>
      </div> )
    );

  function handleChange(event) {
      let newGames = [...games];
      newGames[event.target.dataset.index] = event.target.value;
      setGames(newGames);
      console.log(event.target.dataset.index)
      console.log(event.target.value)
  }

  const addClick = (event) => {
      setGames([...games, event.target.value])
  }
  const handleSubmit = event => {
      addGame(games)
      event.preventDefault();
  }
  return (
    <div className="popup-wrapper">
      <div className="popup event-expanded">
      <button className="close button-no-style" onClick={closePopup}>{del(20, 20)}</button>
        <h2>Add Games</h2>
        {createInputs}
        <div className = "add-game">
          <button onClick = {addClick} className = "button-no-style">
            Add Game{add(20,20)}
          </button>
        </div>
        <br></br>
        <div className = "add-game">
          <button onClick = {handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}
export default AddGamesPopup
