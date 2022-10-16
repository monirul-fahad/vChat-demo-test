"use strict";
let vChat = document.querySelectorAll(".vChat");
let vChatButton = document.querySelectorAll(".vChat__button");
let currentTime = document.querySelector(".current-time");
let vChatPopup = document.querySelector(".vChat__popup");

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



