import React from "react"
import {user} from "./icons.js"

// Creates overlapping user icons, if maxShown+ it will only show maxShown and indicate more exist
// users           (required, [user])     a list of the users at the event
// maxShown        (int)                  The max # icons shown pre-cutoff
const UserList = ({users, maxShown}) => {

  let rended_users = [];

  // check if we are over the maxShown value
  // Note: +1 because showing +1 instead of the icon is kinda stupid....
  if (maxShown && users.length > maxShown+1) {
    // Push in maxShown users
    users.slice(users.length-maxShown).forEach((item, i) => {
      rended_users.push(
        <div className="user-icon" key={i}>
          {user(20, 20)}
        </div>
      )
    });
    // push in last icon to indicate more users
    rended_users.push(
      <div className="user-icon" key="num">
        <p>+{users.length-maxShown}</p>
      </div>
    )
  } else {
    // push in all the users
    users.forEach((item, i) => {
      rended_users.push(
        <div className="user-icon" key={i}>
          {user(20, 20)}
        </div>
      )
    });
  }
  return rended_users
}

export default UserList
