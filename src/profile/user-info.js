import React from "react"

const UserInfo = ({name, userName, location}) => {

  let ret = (
    <div>
      <h3><strong>{name}</strong></h3>
      <p>@{userName}</p>
      <p>#{location}</p>
    </div>
  )

  return ret;
}

export default UserInfo
