import React from "react"
import {add, del} from "../shared/icons.js"
import {useState} from 'react';


const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [capacity, setCapacity] = useState('')
  const [dd, setDD] = useState('')
  const [mm, setMM] = useState('')
  const [yr, setYR] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [details, setDetails] = useState('')
  const [rpg, setRPG] = useState(false)
  const [bg, setBG] = useState(false)
  const [cg, setCG] = useState(false)
  const [vg, setVG] = useState(false)
  const [period, setPeriod] = useState("AM")
  const [state, setState] = useState("AL")
  const [games, setGames] = useState([]);
  const removeClick = (e) => {
    setGames(games.filter( (item, index) => index !==e.target.parentElement.dataset.index));
    e.preventDefault();
  }
  var createInputs = games.map(( el,i) => (
      <div key={"gameNum-" + i} className = "create-input" data-index={i}>
        <label>Game {i+2}:</label>
        <input type="text" data-index={i} placeholder={"Game " + (i+2)} value = {el} onChange={handleChange} />
        <button data-index={i} className = "button-no-style" onClick={removeClick}>{del(20,20)}</button>
      </div> )
  );
  function handleChange(event) {
      let newGames = [...games];
      newGames[event.target.dataset.index] = event.target.value;
      setGames(newGames);
      //console.log(event.target.dataset.index)
      //console.log(event.target.value)
  }
  const addClick = (event) => {
      setGames([...games, event.target.value])
      event.preventDefault();
  }
  const handleSubmit = event => {
      let data = [];
      data[0] = document.getElementById('create-first-game').value;
      for (var i = 0; i < games.length; i++) {
        data[i+1]=games[i]
      }
      console.log(data + "\ntitle:\n" + title + "\ncapcity:\n" + capacity + "\nDD:\n" + dd + "\nMM:\n" + mm + "\nYR:\n" + yr + "\nTime\n" + time + "\nlocation\n" + location + "\ndetails\n" + details)
      console.log("Rpg: " + rpg + " bg: " + bg + " cg: " + cg + " vg: " +vg + " period: " + period + " state: " + state)
      event.preventDefault();
  }

  let ret = (
    <form>
      <div className = "create-page">
        <div className = "create-left">
          <h1> Host Event </h1>
          <button id="createButton" onClick = {handleSubmit}>Create</button>
        </div>
        <div className = "create-right">
          <div className = "create-input">
            <label>Title:</label>
            <input type="text" placeholder="Title" value = {title} onChange={(e) => setTitle(e.target.value)}></input>
          </div>
          <div className = "create-input">
            <label>Game 1:</label>
            <input type="text" id = "create-first-game" placeholder="Game 1"></input>
          </div>
          {createInputs}
          <div className = "add-game">
            <button className = "button-no-style" onClick = {addClick}>
              <p> Add Game</p>{add(20,20)}
            </button>
          </div>
          <div className="game-tags">
            <input type="checkbox" name="createRPG" id="createRPG" checked={rpg} value={rpg} onChange={(e) => setRPG(e.currentTarget.checked)}/>
            <input type="checkbox" name="createBG" id="createBG" checked={bg} value={bg} onChange={(e) => setBG(e.currentTarget.checked)}/>
            <input type="checkbox" name="createCG" id="createCG" checked={cg} value={cg} onChange={(e) => setCG(e.currentTarget.checked)}/>
            <input type="checkbox" name="createVG" id="createVG" checked={vg} value={vg} onChange={(e) => setVG(e.currentTarget.checked)}/>

            <label for="createRPG">Role Playing Game</label>
            <label for="createBG">Board Games</label>
            <label for="createCG">Card Games</label>
            <label for="createVG">Video Games</label>
          </div>
          <div className = "create-input">
            <label>Capacity:</label>
            <input type="text" placeholder="Number of max players" value = {capacity} onChange={(e) => setCapacity(e.target.value)}></input>
          </div>
          <div className = "date">
            <label>DD:</label>
            <input type="text" placeholder="DD" value = {dd} onChange={(e) => setDD(e.target.value)}></input>
            <label>MM:</label>
            <input type="text" placeholder="MM" value = {mm} onChange={(e) => setMM(e.target.value)}></input>
            <label>YR:</label>
            <input type="text" placeholder="YR" value = {yr} onChange={(e) => setYR(e.target.value)}></input>
          </div>
          <div className = "create-input">
            <label>Time:</label>
            <div className = "time">
              <input type="text" placeholder="HH:MM" value = {time} onChange={(e) => setTime(e.target.value)}></input>
            </div>
            <select value = {period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div className = "create-input">
            <label>Location:</label>
            <div className = "time">
              <input type="text" placeholder="Location" value = {location} onChange={(e) => setLocation(e.target.value)}></input>
            </div>
            <select value = {state} onChange={(e) => setState(e.target.value)}>
            	<option value="AL">AL</option>
            	<option value="AK">AK</option>
            	<option value="AZ">AZ</option>
            	<option value="AR">AR</option>
            	<option value="CA">CA</option>
            	<option value="CO">CO</option>
            	<option value="CT">CT</option>
            	<option value="DE">DE</option>
            	<option value="DC">DC</option>
            	<option value="FL">FL</option>
            	<option value="GA">GA</option>
            	<option value="HI">HI</option>
            	<option value="ID">ID</option>
            	<option value="IL">IL</option>
            	<option value="IN">IN</option>
            	<option value="IA">IA</option>
            	<option value="KS">KS</option>
            	<option value="KY">KY</option>
            	<option value="LA">LA</option>
            	<option value="ME">ME</option>
            	<option value="MD">MD</option>
            	<option value="MA">MA</option>
            	<option value="MI">MI</option>
            	<option value="MN">MN</option>
            	<option value="MS">MS</option>
            	<option value="MO">MO</option>
            	<option value="MT">MT</option>
            	<option value="NE">NE</option>
            	<option value="NV">NV</option>
            	<option value="NH">NH</option>
            	<option value="NJ">NJ</option>
            	<option value="NM">NM</option>
            	<option value="NY">NY</option>
            	<option value="NC">NC</option>
            	<option value="ND">ND</option>
            	<option value="OH">OH</option>
            	<option value="OK">OK</option>
            	<option value="OR">OR</option>
            	<option value="PA">PA</option>
            	<option value="RI">RI</option>
            	<option value="SC">SC</option>
            	<option value="SD">SD</option>
            	<option value="TN">TN</option>
            	<option value="TX">TX</option>
            	<option value="UT">UT</option>
            	<option value="VT">VTt</option>
            	<option value="VA">VA</option>
            	<option value="WA">WA</option>
            	<option value="WV">WV</option>
            	<option value="WI">WI</option>
            	<option value="WY">WY</option>
            </select>
          </div>
          <div className = "create-input">
            <label>Details:</label>
            <textarea placeholder="Details" value = {details} onChange={(e) => setDetails(e.target.value)}></textarea>
          </div>
        </div>
      </div>
    </form>
  )
//During a submit, the number of hosted events should increase by 1
  return ret;
}

export default CreatePage
