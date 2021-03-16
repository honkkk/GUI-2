import React from "react"
import {user} from "./icons.js"

const UserList = ({users}) => {

  let rended_users = [];

  if (users.length > 3) {
    users.slice(users.length-3).forEach((item, i) => {
      rended_users.push(
        <div className="user-icon" key={i}>
          {user(20, 20)}
        </div>
      )
    });
    rended_users.push(
      <div className="user-icon" key="num">
        <p>+{users.length-3}</p>
      </div>
    )
  } else {
    users.forEach((item, i) => {
      rended_users.push(
        <div className="user-icon" key={i}>
          {user()}
        </div>
      )
    });
  }



  return rended_users
}

export default UserList
