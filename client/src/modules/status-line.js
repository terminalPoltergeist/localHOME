/*
   _____ __        __                __    _          
  / ___// /_____ _/ /___  _______   / /   (_)___  ___ 
  \__ \/ __/ __ `/ __/ / / / ___/  / /   / / __ \/ _ \
 ___/ / /_/ /_/ / /_/ /_/ (__  )  / /___/ / / / /  __/
/____/\__/\__,_/\__/\__,_/____/  /_____/_/_/ /_/\___/ 
module for configuring the status line
*/

var config = JSON.parse(localStorage.getItem("config"));

// get the document object
let stat = document.getElementById("status");

// setting date/time info
setInterval(() => {
  let d = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let date = d.getDate();
  let day = d.getDay();
  let year = d.getFullYear();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let morning = hours <= 12;
  let time = "";

  if (date.toString().length > 1 && date.toString().at(0) == "1"){
    date += "th";
  } else if (date.toString().at(-1) == "1"){
    date += "st";
  } else if (date.toString().at(-1) == "2"){
    date += "nd";
  } else if (date.toString().at(-1) == "3"){
    date += "rd";
  } else {
    date += "th";
  }

  if (minutes < 10){
    minutes = "0" + minutes;
  }
  if (!config.twentyFourHourTime && hours > 12){
    hours = hours - 12;
  }
  time = hours + ":" + minutes;
  if (morning){
    time += "AM";
  } else {
    time += "PM";
  }

  stat.textContent = " " + days.at(day) + " the " + date + ", " + year + " at " + time;
}, 1000);
