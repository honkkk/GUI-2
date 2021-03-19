import React from "react"
import {game, dice, clock} from "./icons.js"

const CategoryCard = ({img, name, toggled}) => {
  return (
    <div className="category-card event">
      <img src={img} alt={name}/>
      <div className={toggled? " backdrop category-card-toggle" : "backdrop"}></div>
      <h3> {name} </h3>
    </div>
  )
}

export default CategoryCard
