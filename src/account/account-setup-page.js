import React from "react"
import {Link, useHistory} from "react-router-dom";
import {useState} from 'react';
import {user, arrow_right, plus, del} from "../shared/icons.js"
import ProgressBar from "../shared/status-bar.js"
import CategoryCard from "../shared/category-card.js"
import ProfileSetup from "./profile-setup.js"
import GameTypes from "./game-types.js"
import OwnedGames from "./owned-games.js"
import Location from "./location.js"

const AccountSetup = () => {

  // States for the steps, current step, list of games user selects, list of locations user selects
  const [options, setOptions] = useState([
    {mini_name: "Profile", full_name: "Profile Setup"},
    {mini_name: "Categories", full_name: "Game Type"},
    {mini_name: "Games", full_name: "Owned Games"},
    {mini_name: "Locations", full_name: "Locations"}]);
  const [current, setCurrent] = useState(1);
  const [gameList, setGameList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  // Current game catigories to select from
  const [categories, setCategories] = useState([
    {
      name:"Board Games",
      img:"/board.jpg",
      selected: false
    },
    {
      name:"Video Games",
      img:"/video.jpg",
      selected: false
    },
    {
      name:"Card Games",
      img:"/card.jpg",
      selected: false
    },
    {
      name:"Role Playing",
      img:"/rp.jpg",
      selected: false
    },
  ]);
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
    let category = categories[id];
    category.selected = !category.selected;

    console.log(categories.slice(0, id));
    console.log(categories.slice(id+1));
  }

  // All the sections that will be rendered to the user. Display order depends on the value of current
  var sections = [
    <ProfileSetup nextHandler={() => setCurrent(current+1)}/>,
    <GameTypes nextHandler={() => setCurrent(current+1)} categories={categories} categorySelectHandler={category_select_handler}/>,
    <OwnedGames nextHandler={() => setCurrent(current+1)}/>,
    <Location nextHandler={() => setCurrent(current+1)}/>,
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

export default AccountSetup
