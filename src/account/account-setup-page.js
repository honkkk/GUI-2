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

  // Ability for a button to change users path
  const history = useHistory();
  // Current page to display
  const [current, setCurrent] = useState(1);
  // List of selected games and locations
  const [gameList, setGameList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  // Current game catigories to select from and if they are selected
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
  // Data for the user
  const [userData, setUserData] = useState({
    username:'',
    fName:'',
    lName:'',
    day:'',
    month: '',
    year: ''
  });

  const userDataHandler = (e) => {
    setUserData ({...userData, [e.target.id]:e.target.value})
  }

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
  // NOTE: This will be used for feed too...
  const category_select_handler = (id) => {
    let category = categories[id];
    category.selected = !category.selected;
    setCategories([...categories.slice(0, id), category, ...categories.slice(id+1)])
  }

  // List of pages to show for setup
  const options = [
    {mini_name: "Profile", full_name: "Profile Setup"},
    {mini_name: "Categories", full_name: "Game Type"},
    {mini_name: "Games", full_name: "Owned Games"},
    {mini_name: "Locations", full_name: "Locations"}
  ]

  // All the sections that will be rendered to the user. Display order depends on the value of current
  const sections = [
    <ProfileSetup nextHandler={() => setCurrent(current+1)} changeHandler={userDataHandler} userData={userData}/>,
    <GameTypes nextHandler={() => setCurrent(current+1)} backHandler={() => setCurrent(current-1)} categories={categories} categorySelectHandler={category_select_handler}/>,
    <OwnedGames nextHandler={() => setCurrent(current+1)} backHandler={() => setCurrent(current-1)} addGameHandler={addGame} removeGameHandler={removeGame} gameList={gameList}/>,
    <Location nextHandler={() => setCurrent(current+1)} backHandler={() => setCurrent(current-1)} addLocationHandler={addLocation} removeLocationHandler={removeLocation} locationList={locationList}/>,
    (<>
      <h3> Here's what your profile looks like! </h3>
      <div className="user-icon">
        {user(75, 75)}
      </div>
      <p style={{'textAlign':'center'}}>{userData.username}</p>
      <button className="setup-next" onClick={() => setCurrent(current-1)}>Back</button>
      <button className="setup-next" onClick={() => history.push('/feed')}>Finish</button>
    </>),
  ]

  return (
    <div className="sign-page">
      <div className="signup-content profile-setup">
      {/* If we are on a step that exists outside the options range, assume we are all set, and say that*/}
        <h1> {current > options.length ? "All Set!" : options[current-1].full_name} </h1>
        <ProgressBar options={options} current={current} />
        <div className="profile-fields">
          {sections[current-1]}
        </div>
      </div>
    </div>
  );
}

export default AccountSetup
