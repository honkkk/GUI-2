import React from "react"
import {Link} from "react-router-dom";
import {useState} from 'react';
import {arrow_right, check} from "./icons.js"

const ProgressBar = ({options, current}) => {
  var rendered = [];

  options.forEach((item, i) => {
    rendered.push(
      <div className="progress-step" key={i}>
        <div className="progress-step-marker">
          <div className={"marker-circle " + (i+1 === current ? "marker-circle-current ": "") + (i < current-1 ? "marker-circle-complete": "")}>
            {i < current-1 ? check(25, 25): <p>{i+1}</p>}
          </div>
          <p>{item.mini_name}</p>
        </div>
        {options.length-1 !== i && (
          <div className="progress-step-arrow">
            {arrow_right()}
          </div>)
        }
      </div>
    );
  });


  return (
    <div className="progress-bar">
      {rendered}
    </div>
  );
}

export default ProgressBar
