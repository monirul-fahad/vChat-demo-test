"use strict";
let vChat = document.querySelectorAll(".vChat");
let vChatButton = document.querySelectorAll(".vChat__button");
let currentTime = document.querySelector(".current-time");
let vChatPopup = document.querySelector(".vChat__popup");
let availability = document.querySelectorAll(".availability");
let now = moment();

let today = new Date();
let time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
currentTime.innerText = time;

const opeanChatBtn = () => {
  vChat.forEach( (item) => {
      item.classList.toggle('vChat-show');
})       
};

vChatButton.forEach((item) => {
  item.addEventListener('click', opeanChatBtn);
})


/* CHECK AVAILABILITY */
function is_available(available) {
  console.log(available);
  let is_available = false;
  let almost_available = false;
  for (let key in available) {
    if (available.hasOwnProperty(key)) {
      if (get_day_of_week(key) == now.day()) {
        let start = moment(available[key].split("-")[0], "HH:mm"); // available[key] is in this format: 8:00-18:33
        let end = moment(available[key].split("-")[1], "HH:mm"); // available[key] is in this format: 8:00-18:33
        if (moment().isAfter(start) && moment().isBefore(end)) {
          is_available = true;
        } else if (now.isBefore(start)) {
          almost_available = true;
        }
      }
    }
  }
  return { is_available: is_available, almost_available: almost_available };
}

// get week days
function get_day_of_week(name) {
  name = name.toLowerCase();
  if (name == "sunday") {
    return 0;
  } else if (name == "monday") {
    return 1;
  } else if (name == "tuesday") {
    return 2;
  } else if (name == "wednesday") {
    return 3;
  } else if (name == "thursday") {
    return 4;
  } else if (name == "friday") {
    return 5;
  } else if (name == "saturday") {
    return 6;
  }
}

if (availability !== undefined) {
  availability.forEach((item) => {
    const availableTimes = item.getAttribute("data-availability");
    let available = is_available(JSON.parse(availableTimes));
    if (available.is_available) {
      availability.forEach((item) => {
        const availableTime = item.getAttribute("data-availability");
        if (availableTime === availableTimes) {
          item.classList.add("avatar-active");
        }
      });
    } else {
      availability.forEach((item) => {
        const availableTime = item.getAttribute("data-availability");
        if (availableTime === availableTimes) {
          item.classList.add("avatar-inactive");
        }
      });
    }
  });
}