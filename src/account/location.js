import React from "react"
import {Link, useHistory} from "react-router-dom";
import {useState} from 'react';
import {user, arrow_right, plus, del} from "../shared/icons.js"
import ProgressBar from "../shared/status-bar.js"
import CategoryCard from "../shared/category-card.js"
import ProfileSetup from "./profile-setup.js"
import GameTypes from "./game-types.js"
import OwnedGames from "./owned-games.js"

const Location = ({nextHandler, locationList, addLocationHandler, removeLocationHandler, backHandler}) => {

  var locationListRendered = [];
  for (var i = 0; i < locationList.length; i++) {
    locationListRendered.push(
      (
        <div key={i} data-index={i} className="game-title-list-card">
          <p>{locationList[i]}</p>
          <button className="button-no-style" onClick={removeLocationHandler}>{del(15, 15)}</button>
        </div>)
    );
  }

  // All the sections that will be rendered to the user. Display order depends on the value of current

  return (<>
    <h3>Where do you want to join events?</h3>
    <div className="submit-field city-state">
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
      <button onClick={addLocationHandler}> <p>Add</p> </button>
    </div>
    {locationListRendered}
    <button className="setup-next" onClick={backHandler}>Back</button>
    <button className="setup-next" onClick={nextHandler}>Next</button>
  </>)
}

export default Location
