var dropContainer = document.getElementById("drag-area"); // Get the drop container element
var dropMessage = document.getElementById("dropMessage"); // Get the drop message element
var fileInput = document.getElementById("fileInput"); // Get the file input element
var progressBar = document.getElementById("progress"); // Get the progress bar element
var uploadedFilesDiv = document.getElementById("uploadedFiles"); // Get the uploaded files element
var closeFile = document.getElementById("close-file"); // Get the close file button element
var fileContainer = document.getElementById("excel-info"); // Get the file area element
var uploadFile = document.querySelector("#uploadedFiles"); // Get the uploaded file element
var importBtn = document.getElementById("import-btn"); // Get the import button element
var cancelBtn = document.getElementById("cancel-btn"); // Get the cancel button element
var uploadBox = document.querySelector(".upload-box"); // Get the upload box element
var uploadedFile = null; // Variable to store the uploaded file

// Event listener for the close file button
closeFile.addEventListener("click", () => {
  // Hide the file container and show the drop container
  fileContainer.classList.add("hide");
  dropContainer.classList.remove("hide");
  // Reset the uploaded file variable
  uploadedFile = null;

  // Remove the 'change' event listener from the file input
  fileInput.removeEventListener("change", handleFile);
  // Reset the value of the file input
  fileInput.value = "";
});

// Event listener for the drop container to trigger file input click
dropContainer.addEventListener("click", () => {
  fileInput.click();
});

// Event listener for the 'change' event of the file input
fileInput.addEventListener("change", (e) => {
  // Get the selected files
  var files = e.target.files;
  // If files are selected
  if (files.length > 0) {
    // Handle the selected file
    handleFile(files[0]);
  }
});

// Event listener for the 'dragover' event of the drop container
dropContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
  // Add 'dragover' class to the drop container and drop message
  dropContainer.classList.add("dragover");
  dropMessage.classList.add("dragover");
});

// Event listener for the 'dragleave' event of the drop container
dropContainer.addEventListener("dragleave", () => {
  // Remove 'dragover' class from the drop container and drop message
  dropContainer.classList.remove("dragover");
  dropMessage.classList.remove("dragover");
});

// Event listener for the 'drop' event of the drop container
dropContainer.addEventListener("drop", (e) => {
  e.preventDefault();
  // Remove 'dragover' class from the drop container and drop message
  dropContainer.classList.remove("dragover");
  dropMessage.classList.remove("dragover");
  // Get the dropped file
  var file = e.dataTransfer.files[0];
  // Handle the dropped file
  handleFile(file);
});

// Event listener for the 'click' event of the import button
importBtn.addEventListener("click", () => {
  // Check if a file is uploaded
  if (uploadedFile) {
    // Alert upload success
    // Display loading
    document.getElementById("loading").classList.remove("hide");
  }
});

// Event listener for the 'click' event of the cancel button
cancelBtn.addEventListener("click", () => {
  // Hide the upload box
  uploadBox.classList.add("hide");
});

// Function to handle the selected file
function handleFile(file) {
  // Store the uploaded file
  uploadedFile = file;
  // Display the file name and size
  uploadFile.innerHTML = `${file.name} (${file.size} bytes)`;
  // Hide the drop area and show the file area
  fileContainer.classList.remove("hide");
  dropContainer.classList.add("hide");
}
$("#start-date").datepicker({
  format: "mm/yyyy",
  startView: "months",
  minViewMode: "months",
});
