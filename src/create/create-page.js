import React from "react"
import {add, del} from "../shared/icons.js"
import {useState} from 'react';
import { useCookies } from 'react-cookie';
import CreatePopup from "./create-popup.js"

const CreatePage = ({handlers}) => {
  const [showPopup, setShowPopup] = useState(false)
  const [title, setTitle] = useState('')
  const [firstGame, setFirstGame] = useState('')
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
  const [errors, setErrors] = useState({
    "title": false,
    "capacity": false,
    "date": false,
    "location":false,
    "time": false,
    "games": false
  })
  //will hide or show popup when clicked
  const togglePopup = () =>{
    if(showPopup == true){
      setTitle("");
      setCapacity("");
      setDD("");
      setMM("");
      setYR("");
      setTime("");
      setLocation("");
      setDetails("");
      setRPG(false);
      setBG(false);
      setCG(false);
      setVG(false);
      setState("AL");
      setGames([]);
      document.getElementById('create-first-game').value = "";
    }
    setShowPopup(!showPopup);
  }
  //Removes the games using the dataset index.
  const removeClick = (e) => {
    setGames(games.filter( (item, index) => index !=e.target.parentElement.dataset.index));
    e.preventDefault();
  }
  //Creates the new games
  var createInputs = games.map(( el,i) => (
      <div key={"gameNum-" + i} className = "create-input" data-index={i}>
        <label>Game {i+2}:</label>
        <input type="text" className = {errors["games"] && games[i] == "" ? "errorInput" : ""} data-index={i} placeholder={"Game " + (i+2)} value = {el} onChange={handleChange} />
        <button data-index={i} className = "button-no-style" onClick={removeClick}>{del(20,20)}</button>
      </div> )
  );
  //binding the games based on thier dataset index
  function handleChange(event) {
      let newGames = [...games];
      newGames[event.target.dataset.index] = event.target.value;
      setGames(newGames);
      //console.log(event.target.dataset.index)
      //console.log(event.target.value)
  }
  //adds a new game to the list of games
  //Resets the games error so newly added game inputs arent errored by default
  const addClick = (event) => {
      setGames([...games, event.target.value])
      updateError("games");
      event.preventDefault();
  }
  //This function undos the error upon change of the input field
  //To use variable as key, it must have []
  function updateError(name){
    setErrors({...errors, [name]:false});
    //console.log(errors);
  }
  //called before handleSubmit completes, will validate all the input fields before submission.
  function validate(){
    var validated = true;
    const date = new Date(yr, mm-1, dd);
    var currentDate = new Date();
    //Temp = {...errors} as it creates a new object where as temp = errors, passes by refernce which will not reRender
    var temp_error = {...errors};
    if(title == ''){
      temp_error['title'] = true;
      validated = false;
    }
    if(capacity == '' || capacity < 2 || !Number.isInteger(parseFloat(capacity))){
      temp_error['capacity'] = true;
      validated = false;
    }
    if(location == ''){
      temp_error['location'] = true;
      validated = false;
    }
    if (date.getDate() != dd  || date.getMonth()+1 != mm || date.getFullYear() != yr) {
      temp_error["date"] = true;
      validated = false;
    }
    if(yr < currentDate.getFullYear()){
      temp_error["date"] = true;
      validated = false;
    }
    if(mm < (currentDate.getMonth()+1) && yr == currentDate.getFullYear()){
      temp_error["date"] = true;
      validated = false;
    }
    if(dd < currentDate.getDate() && mm == (currentDate.getMonth()+1) && yr == currentDate.getFullYear()){
      temp_error["date"] = true;
      validated = false;
    }
    if(location == ""){
      temp_error['location'] = true;
      validated = false;
    }
    if(time == ""){
      temp_error['time'] = true;
      validated = false;
    }
    for (var i = 0; i < games.length; i++) {
      if(games[i] == ""){
        temp_error["games"] = true;
        validated = false;
      }
    }
    if(document.getElementById('create-first-game').value == ""){
      temp_error["games"] = true;
      validated = false;
    }
    setErrors(temp_error)
    return validated;
  }
  // Show backend errors
  const errorHandler = (error_message) => {
    const error = document.getElementById('error');
    error.style.display = 'block';
    error.innerHTML = error_message;
  }

  const handleSubmit = event => {
      event.preventDefault();

      let session = handlers.session();
      if (!session)
        return;

      let data = [];
      data[0] = document.getElementById('create-first-game').value;
      for (var i = 0; i < games.length; i++) {
        data[i+1]=games[i]
      }
      if(!validate())
        return;

      let categories =
      {
        "board": bg,
        "video": vg,
        "card": cg,
        "rp": rpg
      }
      fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/event/create",
      {
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          session,
          title,
          month: mm,
          day: dd,
          year: yr,
          hour: time.split(":")[0],
          min: time.split(":")[1],
          details: details? details : "",
          categories,
          city: location,
          capacity:parseInt(capacity),
          state,
          state: state,
          games: data,
        })
      })
      .then(function(response) {
        return response.json()
      })
      .then(function(response) {
        if (response.status == null) {
          throw Error(response.statusText)
        }
        // if we have an internal error, report it
        if (response.status == "error")
          throw Error(response.server_message + ", " + response.error_message)
        // if operation succeeded
        if (response.status == "success") {
          //window.location.pathname = "/feed"
          togglePopup();
          return;
        }
      })
      .catch(function(error) {
        errorHandler(error);
      })
  }

  let ret = (
    <form>
      <div className = "create-page">
        <div className = "create-left">
          <h1> Host Event </h1>
          <p id="error">Error messages go here!</p>
          <button id="createButton" onClick = {handleSubmit}>Create</button>
        </div>
        <div className = "create-right">
          <div className = "create-input">
            <label>Title:</label>
            <input type="text" placeholder="Title" className = {errors["title"] ? "errorInput" : ""} value = {title} onChange={(e) => {setTitle(e.target.value); updateError("title");}}></input>
          </div>
          <div className = "create-input">
            <label>Game 1:</label>
            <input type="text" className = {errors["games"] && firstGame == "" ? "errorInput" : ""} id = "create-first-game" placeholder="Game 1" onChange={(e) =>{ setFirstGame(e.target.value);}}></input>
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
            <input type="text" placeholder="Number of max players"  className = {errors["capacity"] ? "errorInput" : ""} value = {capacity} onChange={(e) =>{ setCapacity(e.target.value); updateError("capacity")}}></input>
          </div>
          <div className = "date">
            <label>MM:</label>
            <input type="text" placeholder="MM" className = {errors["date"] ? "errorInput" : ""} value = {mm} onChange={(e) =>{ setMM(e.target.value); updateError("date")}}></input>
            <label>DD:</label>
            <input type="text" placeholder="DD" className = {errors["date"] ? "errorInput" : ""} value = {dd} onChange={(e) =>{ setDD(e.target.value); updateError("date")}}></input>
            <label>YR:</label>
            <input type="text" placeholder="YR" className = {errors["date"] ? "errorInput" : ""} value = {yr} onChange={(e) =>{ setYR(e.target.value); updateError("date")}}></input>
          </div>
          <div className = "create-input">
            <label>Time:</label>
            <input type="time" placeholder="HH:MM" className = {errors["time"] ? "errorInput" : ""} value = {time} onChange={(e) => {setTime(e.target.value); updateError("time");}}></input>
          </div>
          <div className = "create-input">
            <label>Location:</label>
            <div className = "time">
              <input type="text" placeholder="Location" className = {errors["location"] ? "errorInput" : ""} value = {location} onChange={(e) => {setLocation(e.target.value); updateError("location")}}></input>
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
        {showPopup && <CreatePopup closePopup = {togglePopup}/>}
      </div>
    </form>
  )
//During a submit, the number of hosted events should increase by 1
  return ret;
}

export default CreatePage
