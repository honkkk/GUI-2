import React from "react"

const CategoryCard = ({img, name, onSelect, id, checked}) => {
  return (
    <label className="category-card event">
      <input type="checkbox" onClick={() => {onSelect(id)}} checked={checked}/>
      <img src={img} alt={name}/>
      <div className="backdrop"></div>
      <h3> {name} </h3>
    </label>
  )
}

export default CategoryCard
