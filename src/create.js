import React from "react"
import {add} from "./icons.js"
const CreatePage = () => {

  let ret = (
    <form>
      <div className = "create-page">
        <div className = "create-left">
          <h1> Host Event </h1>
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
          <div className = "add-game">
            <button id = "addButton">
              <p> Add Game</p>{add(20,20)}
            </button>
          </div>
          <div class="game-tags">
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
          <div className = "create-input">
            <label>Location:</label>
            <input type="text" placeholder="Location"></input>
          </div>
          <div className = "create-input">
            <label>Details:</label>
            <input type="text" placeholder="Details"></input>
          </div>
        </div>
      </div>
    </form>
  )
//During a submit, the number of hosted events should increase by 1
  return ret;
}

export default CreatePage
