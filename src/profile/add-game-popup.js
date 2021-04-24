import React from "react"
import {del, add} from "../shared/icons.js"
import {useState} from 'react';

const AddGamesPopup = ({closePopup, addGame}) => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(false);
  const removeClick = (e) => {
    setGames(games.filter( (item, index) => index !=e.target.parentElement.dataset.index));
  }

  var createInputs = games.map(( el,i) => (
      <div key={"gamer-" + i} className = "create-input" data-index={i}>
        //error && games[i] == "" ? "errorInput" : "" will show an error if the input is blank and there is some kind of error
        <input type="text" className = {error && games[i] == "" ? "errorInput" : ""} data-index={i} value = {el} onChange={handleChange} />
        <button data-index={i} className = "button-no-style" onClick={removeClick}>{del(20,20)}</button>
      </div> )
    );

  function handleChange(event) {
      let newGames = [...games];
      newGames[event.target.dataset.index] = event.target.value;
      setGames(newGames);
  }
  //Will reset the error message boolean so newly added inputs arent errored out by default.
  const addClick = (event) => {
      setGames([...games, event.target.value])
      setError(false)
  }
//Used to validate games
  const validate = async (event) => {
      var noBlanks = true;
      //If one of the games is blank then change it to an error message
      for (var i = 0; i < games.length; i++) {
        if(games[i] == ""){
          noBlanks = false;
        }
      }
      if(document.getElementById('first-game').value == ""){
        noBlanks = false;
      }
      if(noBlanks){
        handleSubmit(event);
      }
      else{
        setError(!error);
      }
  }

  const handleSubmit = async (event) => {
      event.preventDefault();
      let data = [];
      data[0] = document.getElementById('first-game').value;
      for (var i = 0; i < games.length; i++) {
        data[i+1]=games[i]
      }
      addGame(data);
      closePopup();
  }
  return (
    <div className="popup-wrapper">
      <div className="popup event-expanded">
      <button className="close button-no-style" onClick={closePopup}>{del(20, 20)}</button>
        <h2>Add Games</h2>
        <div key={"gaymer-" + 0} className = "create-input" data-index="-1">
          <input type="text" className = {error && document.getElementById('first-game').value == ""? "errorInput" : ""} data-index="-1" id="first-game" onChange={handleChange} />
        </div>
        {createInputs}
        <div className = "add-game">
          <button onClick = {addClick} className = "button-no-style">
            Add Game{add(20,20)}
          </button>
        </div>
        <br></br>
        <div className = "add-game">
          <button onClick = {validate}>Submit</button>
        </div>
      </div>
    </div>
  )
}
export default AddGamesPopup
