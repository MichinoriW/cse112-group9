/**
 * @file Script to control the landing page's functionality including the zoom
 * in animation to enter the hut. - Last Modified: 06/11/2023
 * @author Nakul Nandhakumar
 * @author Joshua Tan
 * @author Abijit Jayachandran
 * @author Samuel Au
 * @author Helen Lin
 */


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
 * Retrieves the value of a specific cookie by name.
 * @param {string} name - The name of the cookie to retrieve.
 * @returns {string|null} - The value of the cookie, or null if not found.
 */
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Check if there is a logged-in user by checking the 'user_id' cookie
const userId = getCookie('user_id');
if (userId) {
  console.log('Logged in user ID:', userId);
} else {
  console.log('No user logged in');
}

// Event listener for the signup form submission
document.getElementById('signupConfirmBtn').addEventListener('click', async function (event) {
  event.preventDefault();  // Prevent the default form submission behavior
  const myForm = document.getElementById('signupForm');
  const formData = new FormData(myForm);
  const data = Object.fromEntries(formData.entries());
  console.log(JSON.stringify(data));

  try {
      const response = await fetch('http://localhost:5500/api/user/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('HTTP Error:', response.status, errorData);
          alert('An error occurred: ' + response.statusText);
          return;
      }

      const responseData = await response.json();
      console.log('Signup Success:', responseData);
      alert('Signup successful!');
      // Optionally store user data in localStorage
      localStorage.setItem('user', JSON.stringify(responseData));
  } catch (error) {
      console.error('Fetch Error:', error);
      alert('An error occurred');
  }
  hideButtons();
  signupDialog.close();  // Close the signup dialog
  showUserInfo(responseData.username);  // Update the UI to show user info
});

// Event listener for the login form submission
document.getElementById('confirmBtn').addEventListener('click', async function (event) {
  event.preventDefault();  // Prevent the default form submission behavior
  const myForm = document.getElementById('loginForm');
  const formData = new FormData(myForm);
  const data = Object.fromEntries(formData.entries());
  console.log(JSON.stringify(data));

  try {
      const response = await fetch('http://localhost:5500/api/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('HTTP Error:', response.status, errorData);
          alert('An error occurred: ' + response.statusText);
          return;
      }

      const responseData = await response.json();
      console.log('Login Success:', responseData);
      alert('Login successful!');
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(responseData));
  } catch (error) {
      console.error('Fetch Error:', error);
      alert('An error occurred');
  }
  hideButtons();
  loginDialog.close();  // Close the login dialog
  showUserInfo(responseData.username);  // Update the UI to show user info
});


/**
* Hides the authentication buttons (login and signup).
*/
function hideButtons() {
  const authButtons = document.getElementById('authButtons');
  authButtons.style.display = 'none';
}

/**
* Displays the user info and hides the authentication buttons.
* @param {string} username - The username to display.
*/
function showUserInfo(username) {
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const userInfo = document.getElementById('userInfo');
  const usernameSpan = document.getElementById('username');

  loginBtn.style.display = 'none';
  signupBtn.style.display = 'none';
  userInfo.style.display = 'block';
  usernameSpan.textContent = `Welcome, ${username}`;
}

function showLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.style.display = 'block';
}

// Check if the user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  if (user) {
      hideButtons();
      showUserInfo(user.username);
      showLogout();
  }
});
