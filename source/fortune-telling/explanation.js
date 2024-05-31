/**
 * @file The saved-readings-script.js is a script that contains almost all of the
 * functionality needed to store, retrieve, and delete a fortune from localStorage.
 * It also contains functions to display fortunes on the page itself.
 * - Last Modified: 06/11/2023
 * @author Nakul Nandhakumar
 * @author Ezgi Bayraktaroglu
 * @author Joshua Tan
 * @author Abijit Jayachandran
 * @author Samuel Au
 */

/**
 * Adds an event listener to window to call init function when the document
 * has parsed
 */
window.addEventListener("DOMContentLoaded", init);

/**
 * Function adding event listeners for the buttons on the page
 * and calling the function to display fortunes.
 */
function init() {
  /**
   * A reference to the button to go back to the menu
   * @type {HTMLElement | null}
   */
  const backButton = document.querySelector(".backButton");

  /**
   * Adds an event listener for backButton to call the function that
   * sends user back to menu page.
   */
  if (backButton != null) backButton.addEventListener("click", backToMenu);

  /**
   * Display fortunes when page loads
   */
  displayFortunes();

  /* Play sound when pressing buttons */
  //playClickSound();
}

/**
 * Adds event listeners to all buttons to play click sound effect.
 */
// function playClickSound() {
// 	let buttons = document.getElementsByTagName("button");
// 	for (let button of buttons) {
// 	  button.addEventListener('click', () => {
// 		const sound = document.getElementById("click");
// 		sound.play();
// 	  });
// 	}
// }

/**
 * This function sends the user back to the menu page
 */
function backToMenu() {
  //const sound = document.getElementById("click");
  //sound.addEventListener('ended', function (){
  window.location.href = "menu.html";
  //});
  // setTimeout(function() {
  // 	window.location.href = "menu.html";
  // 	}, 400);
}
