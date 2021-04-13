import React from "react"
import {useState} from 'react';
import {user} from "../shared/icons.js"
import ProgressBar from "../shared/status-bar.js"
import ProfileSetup from "./profile-setup.js"
import GameTypes from "./game-types.js"
import OwnedGames from "./owned-games.js"
import Location from "./location.js"
import { useCookies } from 'react-cookie';

const AccountSetup = () => {

  // Current page to display
  const [current, setCurrent] = useState(2);
  // List of selected games and locations
  const [gameList, setGameList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  // Current game catigories to select from and if they are selected
  const [categories, setCategories] = useState([
    {
      name:"Board Games",
      id:"board",
      img:"/board.jpg",
      selected: false
    },
    {
      name:"Video Games",
      id:"video",
      img:"/video.jpg",
      selected: false
    },
    {
      name:"Card Games",
      id:"card",
      img:"/card.jpg",
      selected: false
    },
    {
      name:"Role Playing",
      id:"rp",
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
  // Stop user from changing user data once set in DB
  const [userDataSet, setUserDataSet] = useState(false);
  // Accessing session token
  const [cookies, setCookies, removeCookie] = useCookies(['game1up-user-token']);

  const userDataHandler = (e) => {
    setUserData ({...userData, [e.target.id]:e.target.value})
  }

  const errorHandler = (error_message) => {
    const error = document.getElementById('error');
    error.style.display = 'block';
    error.innerHTML = error_message;
  }

  // Handles the user adding or removing a game from the list
  const addGame = () => {
    let e = document.getElementById('game-title-profile-setup');
    setGameList([...gameList, e.value]);
    e.value = ""
  }
  const removeGame = (e) => {
    setGameList(gameList.filter( (item, index) => index !==e.target.parentElement.dataset.index));
  }

  // Handles a user adding or removing a location from the list
  const addLocation = () => {
    let e_city = document.getElementById('city-profile-setup');
    let e_state = document.getElementById('state-profile-setup');
    setLocationList([...locationList, {city:e_city.value, state:e_state.value}]);
    e_city.value = "";
  }
  const removeLocation = (e) => {
    setLocationList(locationList.filter( (item, index) => index !==e.target.parentElement.dataset.index));
  }

  // Handles changes of what catigories are selcted
  // NOTE: This will be used for feed too...
  const category_select_handler = (id) => {
    let category = categories[id];
    category.selected = !category.selected;
    setCategories([...categories.slice(0, id), category, ...categories.slice(id+1)])
  }

  const onPrefSubmit = () => {

    document.getElementById('error').style.display = "none";

    const reduced_categories = categories.map( item =>  {
        return {id: item.id, selected: item.selected}
      })

    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/setup/preferences",
    {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        locations:locationList,
        games:gameList,
        categories: reduced_categories,
        session: cookies.token
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      if (response.status === null) {
        throw Error(response.statusText)
      }
      if (response.status === "error")
        throw Error(response.server_message + ", " + response.error_message)
      if (response.status === "success") {
        console.log(response.token);
        setCookies("token", response.token);
        window.location.href = './feed'
      }
    })
    .catch(function(error) {
      errorHandler(error);
      console.log(error);
    })
  }

  const onProfileSubmit = () => {

    document.getElementById('error').style.display = "none";

    if (userDataSet) {
      setCurrent(current+1);
      return;
    }

    let {username, fName, lName, month, day, year} = userData;
    // Validate date of birth submitted (constrains ensure no overflow when creating the date)
    const date = new Date(year, month, day);
    if (date.getDate() != day || date.getFullYear() != year ||
        date.getMonth() != month || year > 2100 || month > 11 ||
        day > 31 || year < 1900 || month < 0 || day < 0) {
      errorHandler("Incorrect or missing date, try again.")
      return;
    }
    // Validates DOB is in the past
    if (date.getTime() >= Date.now()) {
      errorHandler("Invalid date. Please provide a real date of birth...")
      return;
    }
    // Validates the username
    let re = /^[a-z]([a-z,0-9]?){4,15}$/
    username = username.toLowerCase();
    if (!re.test(username)) {
      errorHandler("Invalid username format. Username must start with a letter, only contain letters and numbers, and be between 5 and 16 characters long.")
      return;
    }
    // Verify user's first and last name
    if (!fName || !lName) {
      errorHandler("Please provide a valid name!");
      return;
    }

    fetch(process.env.REACT_APP_SERVER_URL + "/.netlify/functions/api/account/setup/user",
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        username,
        fName,
        lName,
        birth_year:year,
        birth_month:month,
        birth_day:day,
        session: cookies.token
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      if (response.status === null) {
        throw Error(response.statusText)
      }
      if (response.status === "error")
        throw Error(response.server_message + ", " + response.error_message)
      if (response.status === "success") {
        console.log(response.message);
        setUserDataSet(true);
        setCurrent(current+1);
      }
    })
    .catch(function(error) {
      errorHandler(error);
      console.log(error);
    })
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
    <ProfileSetup nextHandler={onProfileSubmit} changeHandler={userDataHandler} userData={userData} locked={userDataSet}/>,
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
      <button className="setup-next" onClick={onPrefSubmit}>Finish</button>
    </>),
  ]

  return (
    <div className="sign-page">
      <div className="signup-content profile-setup">
      {/* If we are on a step that exists outside the options range, assume we are all set, and say that*/}
        <h1> {current > options.length ? "All Set!" : options[current-1].full_name} </h1>
        <ProgressBar options={options} current={current} />
        <p id="error">Error messages go here!</p>
        <div className="profile-fields">
          {sections[current-1]}
        </div>
      </div>
    </div>
  );
}

export default AccountSetup
