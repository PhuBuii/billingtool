// Retrieve the loader and loading text elements from the DOM
const loader = document.getElementById("loading");
const loadingText = document.getElementById("loading-text");

// Initialize an array to store phases for the rotating "LOADING..." effect
const loadingPhases = ["LOADING", "LOADING.", "LOADING..", "LOADING..."];

// Variable to store the index of the array
let phaseIndex = 0;

// Function to execute the loading text effect
function updateLoadingText() {
  // Get the next element in the loadingPhases array
  const nextPhase = loadingPhases[phaseIndex];

  // Update the content of the loading text element
  loadingText.textContent = nextPhase;

  // Increase the index of the array. If the index exceeds the array length, reset to index 0
  phaseIndex = (phaseIndex + 1) % loadingPhases.length;
}

// Call the updateLoadingText function every 500ms to update the content of the loading text element
setInterval(updateLoadingText, 500);
