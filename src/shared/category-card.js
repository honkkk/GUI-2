import React from "react"
import {game, dice, clock} from "./icons.js"

const CategoryCard = ({img, name, onSelect, id}) => {
  return (
    <label className="category-card event">
      <input type="checkbox" onClick={() => {onSelect(id)}}/>
      <img src={img} alt={name}/>
      <div className="backdrop"></div>
      <h3> {name} </h3>
    </label>
  )
}

export default CategoryCard