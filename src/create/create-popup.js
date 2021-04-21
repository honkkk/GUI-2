import React from "react"
import {useState} from 'react';

const CreatePopup = ({closePopup}) => {
  return (
    <div className="popup-wrapper">
      <div className="popup event-expanded" >
        <h2 style = {{textAlign: "center"}}>Your event has successfully been created!</h2>
        <div className = "confirm-button">
          <button  onClick = {closePopup}>Okay</button>
        </div>
      </div>
    </div>
  )
}
export default CreatePopup
