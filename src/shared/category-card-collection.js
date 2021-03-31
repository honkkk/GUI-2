import React from "react"
import {game, dice, clock} from "./icons.js"
import {useState} from 'react';
import CategoryCard from "../shared/category-card.js"

const CategoryCardCollection = ({categories, selectHandler}) => {

  let renderedCategoryCards = []

  categories.forEach((item, i) => {
    renderedCategoryCards.push(<CategoryCard key={i} id={i} onSelect={selectHandler} img={process.env.PUBLIC_URL + item.img} name={item.name} checked={item.selected}/>)
  });


  //img, name, onSelect, id
  return (
    <div className="category-card-container">
      {renderedCategoryCards}
    </div>
  )
}

export default CategoryCardCollection
