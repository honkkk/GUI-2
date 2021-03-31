import React from "react"
import CategoryCardCollection from "../shared/category-card-collection.js"


const GameTypes = ({nextHandler, categories, categorySelectHandler}) => {

  // All the sections that will be rendered to the user. Display order depends on the value of current
  return (<>
      <h3>What type of games do you play?</h3>
      {<CategoryCardCollection categories={categories} selectHandler={categorySelectHandler}/>}
      <button className="setup-next" onClick={nextHandler}>Next</button>
    </>
  )
}

export default GameTypes
