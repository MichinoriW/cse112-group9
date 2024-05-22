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
window.addEventListener('DOMContentLoaded', init);


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
   * A reference to the button to clear the fortunes from
   * local storage and from the display. Is temporary, for
   * testing, but could be useful in the final product as well.
   * @type {HTMLElement | null}
   */
  const clearButton = document.querySelector(".clearButton");

	/**
	 * Adds an event listener for backButton to call the function that
	 * sends user back to menu page.
	 */
  if (backButton != null)
  	  backButton.addEventListener("click", backToMenu);

	/**
 	 * Adds a event listener for tempClearButton to call the function
	 * that clears fortunes from localeStorage and updates display.
 	 */
  if (clearButton != null)
    	clearButton.addEventListener("click", clearFortunes);

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

/**
 * This function clears the localStorage of (only) fortunes and
 * calls the displayFortunes function to update the display to
 * be cleared of fortunes. This function is called by the 
 * event listener added to tempClearButton. This is meant to be a 
 * temporary fuction used help test, but it could be useful for
 * the actual page.
 */
function clearFortunes() {
	localStorage.removeItem("fortunes");
	displayFortunes();
}

/**
 * Adds a event listener that fires whenever the localstorage
 * changes "in the context of another document" (mozilla.org)
 * and calls the displayFortunes function.
 * This means that if the fortune page is open in another tab
 * and the fortune bank is open in another tab and changes are
 * made to local storage in that other tab, the fortune bank
 * page will detect it. This means that if a fortune is saved
 * in the other page, this event listener will activate.
 * It will call the displayFortunes function and update
 * the display to include the fortune that was saved on the
 * other tab.
 */
window.addEventListener('storage', displayFortunes);

/**
 * This function adds a fortune to localStorage. Does not add the fortune if it
 * is a duplicate of another fortune already in localStorage.
 * @param {string} - the text of the fortune
 * @param {string} - the category of the fortune
 * @param {Date} - a JavaScript Date object
 */
export function addFortune(fortuneText, category, date) {
	// Get existing fortunes from localStorage
	let savedFortunes = getFortunes();

	// Convert date into weekday day month year
	let modifiedDate = date.toLocaleDateString(undefined, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	// Check if fortune already exists, before choosing to save fortune or not
	if (checkDuplicate([fortuneText,category,modifiedDate]) == -1) {
		savedFortunes.push([fortuneText,category,date]);
		localStorage.setItem('fortunes', JSON.stringify(savedFortunes));
	}
}

/**
 * Retrieves fortunes from localStorage and returns an array
 * of fortunes. If nothing in local storage, it returns an empty array.
 * @param {string} - the text of the fortune
 * @param {string} - the category of the fortune
 * @returns {Array<Object>} - an array of fortunes, each with fortune, category,
 * and date elements
 */
async function getFortunes() {
    try {
        // Make an HTTP GET request to the server API endpoint
        const response = await fetch('http://localhost:5500/api/fortuneMsg/');
        if (!response.ok) {
            throw new Error('Failed to fetch fortunes');
        }
        const fortunes = await response.json();
		console.log(fortunes);
        return fortunes;
    } catch (error) {
        console.error('Error fetching fortunes:', error);
        return [];
    }
}

/**
 * Uses getFortunes and displays the fortunes it
 * gets on the page with a div element for each fortune. Every
 * time this function is called, it clears everything in the 
 * element refered to by history and re-adds each fortune to the
 * page. The date values of the fortunes are displayed according to
 * the locale of the browser. So if your browser uses Spanish 
 * for the UI, the date would be in Spanish.
 */
async function displayFortunes() {
    const history = document.querySelector(".historyWrapper");
    if (!history)
        return;

    try {
        // Retrieve fortunes from the server
        let user = JSON.parse(localStorage.getItem('user'));
        let user_id = user.user_id;
        const response = await fetch(`http://localhost:5500/api/fortuneMsg/${user_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch fortunes');
        }
        const fortunes = await response.json();
        // Clear the display of fortunes
        history.innerHTML = '';

        // Loop through each fortune and display it
        fortunes.forEach((fortune, index) => {
            // Create div element as wrapper
            let fortuneInList = document.createElement('div');
            fortuneInList.classList.add("fortune");

            // Create an h3 element that holds fortune text
            let fortuneText = document.createElement("h3");
            fortuneText.innerHTML = fortune.description;
            fortuneText.classList.add("fortuneText");

            // Create an h3 element that holds fortune category
            let fortuneCategory = document.createElement("h3");
            fortuneCategory.innerHTML = fortune.category_id;
            fortuneCategory.classList.add("fortuneCategory");

            // Create an h3 element that holds fortune date (specific to locale)
            let fortuneDate = document.createElement("h3");
            fortuneDate.innerHTML = new Date(fortune.date).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            fortuneDate.classList.add("fortuneDate");
			
            // Add Delete Button
            let deleteButton = document.createElement('img');
            deleteButton.src = "assets/saved-readings-page/trash.png";
            deleteButton.style.borderRadius = '5px';
            deleteButton.style.height = "100%";

            // Red border on mouse over
            deleteButton.addEventListener('mouseover', () => {
                deleteButton.style.boxShadow = '0 0 10px 5px #ff0000';
            });

            // No border color when not hovering
            deleteButton.addEventListener('mouseout', () => {
                deleteButton.style.boxShadow = '';
            });

            // Delete fortune on click
            deleteButton.addEventListener('click', async () => {
                
                try {
                    let user = JSON.parse(localStorage.getItem('user'));
                    let user_id = user.user_id;

                    // Make an HTTP DELETE request to delete the fortune
                    const deleteResponse = await fetch(`http://localhost:5500/api/fortuneMsg/${user_id}?fortune_id=${fortune._id}`, {
                        method: 'DELETE'
                    });
                    if (!deleteResponse.ok) {
                        throw new Error('Failed to delete fortune');
                    }
                    // Re-display fortunes after deletion
                    displayFortunes();
                } catch (error) {
                    console.error('Error deleting fortune:', error);
                }
            });

			// adds image based off category
			console.log(fortuneCategory.innerHTML);
			let fortuneImg = document.createElement('img');
			if(fortuneCategory.innerHTML === 'Love'){
				fortuneImg.src = `assets/card-page/love_back.png`;
			}
			else if(fortuneCategory.innerHTML === 'School'){
				fortuneImg.src = `assets/card-page/school_back.png`;
			}
			else if(fortuneCategory.innerHTML === 'Life'){
				fortuneImg.src = `assets/card-page/life_back.png`;
			}
			fortuneImg.style.display = 'block';

            // Add elements with fortune text, category, and date to the fortune div wrapper
            let fortuneDetails = document.createElement("div");
            fortuneDetails.classList.add("fortuneDetails");
			fortuneDetails.appendChild(fortuneImg);
            fortuneDetails.appendChild(fortuneCategory);
            fortuneDetails.appendChild(fortuneDate);
            fortuneDetails.appendChild(deleteButton);

            fortuneInList.appendChild(fortuneDetails);
            fortuneInList.appendChild(fortuneText);
            history.appendChild(fortuneInList);
        });
    } catch (error) {
        console.error('Error fetching/displaying fortunes:', error);
    }
}
/**
 * Function that enables the individual deletion of fortunes from the saved-reading pages.
 * We pass the index of the fortune that it has in the localstorage array
 * and splice the array to remove that one index. Check if it the index is greater
 * than -1.
 * @param {number} fortuneIndex - the index of the fortune in the localstorage array
 */
function deleteFortune(fortuneIndex) {
	let savedFortunes = getFortunes();
    if (fortuneIndex > -1) {
        savedFortunes.splice(fortuneIndex, 1);
        localStorage.setItem('fortunes', JSON.stringify(savedFortunes));
    }
}

/**
 * Takes in a fortune array containing the fortuneText, category, and date and
 * checks if there is another fortune in local storage that matches this fortune.
 * Returns the index of the fortune in the localStorage array otherwise returns
 * -1 if does not exist.
 * @param {Array<Object>} fortune 
 */
function checkDuplicate(fortune) {
	// Get saved fortunes from localStorage
	let savedFortunes = getFortunes();

	// For each fortune in the localStorage, check if the contents are equal 
	// to the passed in fortune
	for (let i = 0; i < savedFortunes.length; i++) {
		// Convert saved date to modified date string for equal comparisons
		let modifiedDate = new Date(savedFortunes[i][2]).toLocaleDateString(undefined, {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		if (fortune[0] == savedFortunes[i][0]) {
			if (fortune[1] == savedFortunes[i][1]) {
				if (fortune[2] == modifiedDate) {
					return i;
				}
			}
		}
	}

	return -1;
}
