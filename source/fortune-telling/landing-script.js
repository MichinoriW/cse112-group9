/**
 * @file Script to control the landing page's functionality including the zoom
 * in animation to enter the hut. - Last Modified: 06/11/2023
 * @author Nakul Nandhakumar
 * @author Joshua Tan
 * @author Abijit Jayachandran
 * @author Samuel Au
 * @author Helen Lin
 */

const { getUser, createUser } = require("../backend/controllers/userController");



/**
 * A reference to the html element of the page which defines the background-image
 * @type {HTMLElement | null}
 */
const hutBackground = document.querySelector("html");

/**
 * A reference to the body element of the page which includes the page contents
 * @type {HTMLElement | null}
 */
const pageContents = document.querySelector("body");

/**
 * A reference to the button for entering the hut and triggering the animation
 * @type {HTMLElement | null}
 */
const enterButton = document.querySelector("#menu");

/**
 * A function to get the button for playing the woosh sound
 */
// function playWoosh() {
//     let woosh = document.getElementById("woosh");
//     woosh.volume = 0.3;
//     woosh.play();
// }

/**
 * This function sends the user to the menu page where they can select what type
 * of fortune they would like to receive and is called after a timeout to allow
 * for the animation to trigger.
 */
function toMenuPage() {
  window.location.href = "menu.html";
}

/**
 * This function is responsible for removing the contents of the page and
 * triggering the animation of zooming into the hut while also redirecting
 * to the menu page after zooming in enough.
 */
function enterHut() {
  /* Go to menu page after 0.75 seconds upon clicking the button */
  setTimeout(toMenuPage, 500);
  /* Clear all elements from page */
  pageContents.innerHTML = "";

  /* Call the entering hut animation */
  hutBackground.style.animation = "zoom 2s forwards";
}

/* Add the listener to the landing page button */
enterButton.addEventListener("click", enterHut);

/* --NEW login script-- */
const loginButton = document.getElementById("loginBtn");
const loginDialog = document.getElementById("loginDialog");
const signupButton = document.getElementById("signupBtn");
const signupDialog = document.getElementById("signupDialog");

loginButton.addEventListener("click", () => {
  loginDialog.showModal();
});
signupButton.addEventListener("click", () => {
  signupDialog.showModal();
});


/** 
 * User Login Controlls
 */
const confirmButton = document.getElementById("confirmBtn")
const loginUser = doment.querySelector("name")
const loginPass = doment.querySelector("password")

confirmButton.addEventListener("click", () => {
  const username = loginUser.value
  const password = loginPass.value

  const data = {username: username, password: password}

  const userData = getUser(data)
  const user = new User(userData)

  /* --Global Model-- */
  global.user = user;

  toMenuPage()
});

/**
 * Sign Up Controlls
 */
const confirmSignUpButton = document.getElementById("signupConfirmBtn")
const signUpEmail = doment.querySelector("email")
const signUpUser = doment.querySelector("signupName")
const signUpPass = doment.querySelector("signupPassword")

confirmSignUpButton.addEventListener("click", () => {
  const email = signUpEmail.value
  const username = signUpUser.value
  const password = signUpPass.value

  const data = {email : email, username : username, password:password}
  const userData = createUser(data)
  const user = new User(userData)

  /* --Global Model-- */
  global.user = user;

  toMenuPage()
});
// TODO: script to fetch the database

// enterButton.addEventListener('click', () => {
//    setTimeout(playWoosh, 500);
//    setTimeout(enterHut, 1000);
//  });

// /* Add event listener to start music when DOMContentLoaded */
//document.addEventListener("DOMContentLoaded", startBackgroundMusic());

// /**
//   * Reduce background music volume
//   */
// function startBackgroundMusic() {
//    let backgroundMusic = document.getElementById("music");
//    backgroundMusic.volume = 0.1;
//    backgroundMusic.play();
// }
