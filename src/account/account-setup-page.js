import React from "react"
import {Link, useHistory} from "react-router-dom";
import {useState} from 'react';
import {user, arrow_right, plus, del} from "../shared/icons.js"
import ProgressBar from "../shared/status-bar.js"
import CategoryCard from "../shared/category-card.js"

const ProfileSetup = () => {

  // States for the steps, current step, list of games user selects, list of locations user selects
  const [options, setOptions] = useState([
    {mini_name: "Profile", full_name: "Profile Setup"},
    {mini_name: "Categories", full_name: "Owned Games"},
    {mini_name: "Games", full_name: "Game Type"},
    {mini_name: "Locations", full_name: "Locationse"}]);
  const [current, setCurrent] = useState(1);
  const [gameList, setGameList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [categories, setCategories] = useState([]);
  // Ability for a button to change users path
  const history = useHistory();

  // Handles the user adding or removing a game from the list
  const addGame = () => {
    let e = document.getElementById('game-title-profile-setup');
    setGameList([...gameList, e.value]);
    e.value = ""
  }
  const removeGame = (e) => {
    setGameList(gameList.filter( (item, index) => index !=e.target.parentElement.dataset.index));
  }

  // Handles a user adding or removing a location from the list
  const addLocation = () => {
    let e_city = document.getElementById('city-profile-setup');
    let e_state = document.getElementById('state-profile-setup');
    setLocationList([...locationList, e_city.value + ", " + e_state.value]);
    e_city.value = "";
  }
  const removeLocation = (e) => {
    setLocationList(locationList.filter( (item, index) => index !=e.target.parentElement.dataset.index));
  }

  // Handles changes of what catigories are selcted
  const category_select_handler = (id) => {
    let result = categories.filter( (item) => item != id );
    if (result.length == categories.length)
      result.push(id)
    setCategories(result);
    console.log(result);
  }

  // Renders the game and location lists
  var gameListRendered = [];
  for (var i = 0; i < gameList.length; i++) {
    gameListRendered.push(
      (
        <div key={i} data-index={i} className="game-title-list-card">
          <p>{gameList[i]}</p>
          <button className="button-no-style" onClick={removeGame}>{del(15, 15)}</button>
        </div>)
    );
  }
  var locationListRendered = [];
  for (var i = 0; i < locationList.length; i++) {
    locationListRendered.push(
      (
        <div key={i} data-index={i} className="game-title-list-card">
          <p>{locationList[i]}</p>
          <button className="button-no-style" onClick={removeLocation}>{del(15, 15)}</button>
        </div>)
    );
  }

  // A simple component for the next button
  const next_button = (
    <button className="setup-next" onClick={() => setCurrent(current+1)}>Next</button>
  )

  // All the sections that will be rendered to the user. Display order depends on the value of current
  var sections = [
    (<>
      <div class="user-icon">
        {user(75, 75)}
        <button class="plus">{plus(20, 20)}</button>
      </div>
      <div className="setup-field">
        <label>
          <p> Username </p>
          <input type="text"/>
        </label>
        <div className="date-field">
          <label>
            <p> Birthday </p>
            <input type="text" placeholder="Day"/>
          </label>
          <label>
            <input type="text" placeholder="Month"/>
          </label>
          <label>
            <input type="text" placeholder="Year"/>
          </label>
        </div>
      </div>
      {next_button}
    </>),
    (<>
      <h3>What type of games do you play?</h3>
      <div className="category-card-container">
        <CategoryCard id={0} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/board.jpg"} name="Board Games"/>
        <CategoryCard id={1} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/video.jpg"} name="Video Games"/>
        <CategoryCard id={2} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/card.jpg"} name="Card Games"/>
        <CategoryCard id={3} onSelect={category_select_handler} img={process.env.PUBLIC_URL + "/rp.jpg"} name="Role Playing"/>
      </div>
      {next_button}
    </>),
    (<>
      <h3>What are some games you own?</h3>
      <div class="submit-field">
        <label>
          <p> Title </p>
          <input type="text" id="game-title-profile-setup"/>
        </label>
        <button onClick={addGame}> <p>Add</p> </button>
      </div>
      {gameListRendered}
      {next_button}
    </>),
    (<>
      <h3>Where do you want to join events?</h3>
      <div class="submit-field city-state">
        <label>
          <p> City </p>
          <input type="text" id="city-profile-setup"/>
        </label>
        <label>
          <p> State </p>
          <select id="state-profile-setup">
          	<option value="AL">Alabama</option>
          	<option value="AK">Alaska</option>
          	<option value="AZ">Arizona</option>
          	<option value="AR">Arkansas</option>
          	<option value="CA">California</option>
          	<option value="CO">Colorado</option>
          	<option value="CT">Connecticut</option>
          	<option value="DE">Delaware</option>
          	<option value="DC">District Of Columbia</option>
          	<option value="FL">Florida</option>
          	<option value="GA">Georgia</option>
          	<option value="HI">Hawaii</option>
          	<option value="ID">Idaho</option>
          	<option value="IL">Illinois</option>
          	<option value="IN">Indiana</option>
          	<option value="IA">Iowa</option>
          	<option value="KS">Kansas</option>
          	<option value="KY">Kentucky</option>
          	<option value="LA">Louisiana</option>
          	<option value="ME">Maine</option>
          	<option value="MD">Maryland</option>
          	<option value="MA">Massachusetts</option>
          	<option value="MI">Michigan</option>
          	<option value="MN">Minnesota</option>
          	<option value="MS">Mississippi</option>
          	<option value="MO">Missouri</option>
          	<option value="MT">Montana</option>
          	<option value="NE">Nebraska</option>
          	<option value="NV">Nevada</option>
          	<option value="NH">New Hampshire</option>
          	<option value="NJ">New Jersey</option>
          	<option value="NM">New Mexico</option>
          	<option value="NY">New York</option>
          	<option value="NC">North Carolina</option>
          	<option value="ND">North Dakota</option>
          	<option value="OH">Ohio</option>
          	<option value="OK">Oklahoma</option>
          	<option value="OR">Oregon</option>
          	<option value="PA">Pennsylvania</option>
          	<option value="RI">Rhode Island</option>
          	<option value="SC">South Carolina</option>
          	<option value="SD">South Dakota</option>
          	<option value="TN">Tennessee</option>
          	<option value="TX">Texas</option>
          	<option value="UT">Utah</option>
          	<option value="VT">Vermont</option>
          	<option value="VA">Virginia</option>
          	<option value="WA">Washington</option>
          	<option value="WV">West Virginia</option>
          	<option value="WI">Wisconsin</option>
          	<option value="WY">Wyoming</option>
          </select>
        </label>
        <button onClick={addLocation}> <p>Add</p> </button>
      </div>
      {locationListRendered}
      {next_button}
    </>),
    (<>
      <h3> Here's what your profile looks like! </h3>
      <div class="user-icon">
        {user(75, 75)}
      </div>
      <p style={{'textAlign':'center'}}>@Username - 19 years old</p>
      <button className="setup-next" onClick={() => history.push('/feed')}>Finish</button>
    </>),
  ]

  return (
    <div className="sign-page">
      <div className="signup-content profile-setup">
      {/* If we are on a step that exists outside the options range, assume we are all set, and say that*/}
        <h1> {current > options.length ? "All Set!" : options[current-1].full_name} </h1>
        <ProgressBar options={options} current={current} />
        <div class="profile-fields">
          {sections[current-1]}
        </div>
      </div>
    </div>
  );
}

export default ProfileSetup
