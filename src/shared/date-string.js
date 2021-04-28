import React from "react"

const DateString = ({date}) => {
  //console.log(date);
  var year = date.split("-")[0];
  var month = date.split("-")[1];
  var day = date.split("-")[2];
  day = day.split("T")[0];
  let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"];
  var type = 0;
  if(day == 2 || day == 22){
    type = 1;
  }
  if(day == 3 || day == 23){
    type = 2;
  }
  if(day > 3 && day < 21){
    type = 3;
  }
  let dayType = ["st","nd","rd","th"];
  let ret = (
    <div>
      <p>{monthName[month-1]} {day}{dayType[type]}, {year}</p>
    </div>
  )

  return ret;
}

export default DateString
