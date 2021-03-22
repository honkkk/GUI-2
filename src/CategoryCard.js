import React from "react"
import {game, dice, clock} from "./icons.js"

const CategoryCard = ({img, name, toggled}) => {
  return (
    <label className="category-card event">
      <input type="checkbox"/>
      <img src={img} alt={name}/>
      <div className="backdrop"></div>
      <h3> {name} </h3>
    </label>
  )
}

export default CategoryCard
