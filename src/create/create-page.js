import React from "react"
import {add, del} from "../shared/icons.js"
import {useState} from 'react';


const CreatePage = () => {
  const [games, setGames] = useState([]);
  const removeClick = (e) => {
    setGames(games.filter( (item, index) => index !=e.target.parentElement.dataset.index));
    e.preventDefault();
  }
  var createInputs = games.map(( el,i) => (
      <div key={"gaymer-" + i} className = "create-input" data-index={i}>
        <label>Game {i+2}:</label>
        <input type="text" data-index={i} value = {el} onChange={handleChange} />
        <button data-index={i} className = "button-no-style" onClick={removeClick}>{del(20,20)}</button>
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
      event.preventDefault();
  }
  const handleSubmit = event => {
      let data = [];
      data[0] = document.getElementById('first-game').value;
      for (var i = 0; i < games.length; i++) {
        data[i+1]=games[i]
      }
      event.preventDefault();
  }

  let ret = (
    <form>
      <div className = "create-page">
        <div className = "create-left">
          <h1> Host Event </h1>
          <button id="createButton">Create</button>
        </div>
        <div className = "create-right">
          <div className = "create-input">
            <label>Title:</label>
            <input type="text" placeholder="Title"></input>
          </div>
          <div className = "create-input">
            <label>Game 1:</label>
            <input type="text" placeholder="Game 1"></input>
          </div>
          {createInputs}
          <div className = "add-game">
            <button className = "button-no-style" onClick = {addClick}>
              <p> Add Game</p>{add(20,20)}
            </button>
          </div>
          <div className="game-tags">
            <input type="checkbox" name="createRPG" id="createRPG"/>
            <input type="checkbox" name="createBG" id="createBG" />
            <input type="checkbox" name="createCG" id="createCG" />
            <input type="checkbox" name="createVG" id="createVG" />

            <label for="createRPG">Role Playing Game</label>
            <label for="createBG">Board Games</label>
            <label for="createCG">Card Games</label>
            <label for="createVG">Video Games</label>
          </div>
          <div className = "create-input">
            <label>Capacity:</label>
            <input type="text" placeholder="Number of max players"></input>
          </div>
          <div className = "date">
            <label>DD:</label>
            <input type="text" placeholder="DD"></input>
            <label>MM:</label>
            <input type="text" placeholder="MM"></input>
            <label>YR:</label>
            <input type="text" placeholder="YR"></input>
          </div>
          <div className = "create-input">
            <label>Time:</label>
            <div className = "time">
            <input type="text" placeholder="HH:MM"></input>
            </div>
            <select>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div className = "create-input">
            <label>Location:</label>
            <input type="text" placeholder="Location"></input>
          </div>
          <div className = "create-input">
            <label>Details:</label>
            <textarea placeholder="Details"></textarea>
          </div>
        </div>
      </div>
    </form>
  )
//During a submit, the number of hosted events should increase by 1
  return ret;
}

export default CreatePage
