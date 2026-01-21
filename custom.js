$(document).ready(function(){
    // active thumbnail
    $("#thumbSlider .thumb").on("click", function(){
              $(this).addClass("active");
              $(this).siblings().removeClass("active");
          
          });
  })
    // Show Player Details options when Player Details is selected
    document.getElementById('playerDetails').addEventListener('change', function() {
        document.getElementById('playerDetailsOptions').style.display = 'block';
    });

    // Hide Player Details options when No Personalisation is selected
    document.getElementById('noPersonalisation').addEventListener('change', function() {
        document.getElementById('playerDetailsOptions').style.display = 'none';
    });
  
        // Show Player Details options when Player Details is selected
        document.getElementById('playerDetails1').addEventListener('change', function() {
          document.getElementById('playerDetailsOptions1').style.display = 'block';
      });
  
      // Hide Player Details options when No Personalisation is selected
      document.getElementById('noPersonalisation1').addEventListener('change', function() {
          document.getElementById('playerDetailsOptions1').style.display = 'none';
      });
 
 // Initial colors and pattern
 let currentBaseColor = 'white';
 let currentSleeveColor = 'white';
 let currentCollarColor = 'white';
 let currentPattern = 'essential';
 let currentPatternColor = 'plain'; // Default pattern color when 'essential'

 // Function to change the T-shirt's image based on base, sleeve, collar, pattern, and pattern color
 function changeTshirt(baseColor, sleeveColor, collarColor, pattern, patternColor) {
   // Update current variables
   currentBaseColor = baseColor;
   currentSleeveColor = sleeveColor;
   currentCollarColor = collarColor;
   currentPattern = pattern;
   currentPatternColor = patternColor;

   // Ensure pattern color is not the same as the base color
   if (currentPatternColor === currentBaseColor) {
     currentPatternColor = getDifferentPatternColor();
   }

   // Construct the image file names for both front and back based on colors, pattern, and pattern color
   const newImageSrcFront = `custom_img/tshirt_base_${baseColor}_sleeve_${sleeveColor}_collar_${collarColor}_pattern_${pattern}_patterncolor_${currentPatternColor}.png`;
   const newImageSrcBack = `custom_img/bs_tshirt_base_${baseColor}_sleeve_${sleeveColor}_collar_${collarColor}_pattern_essential_patterncolor_plain.png`;

   // Change the T-shirt images (front and back)
   document.getElementById('tshirtFront').src = newImageSrcFront;
   document.getElementById('tshirtBack').src = newImageSrcBack;

   // Update the visibility of pattern color buttons
   updatePatternColorButtons();

   // If the pattern is 'veins', automatically change the collar color to white and disable the black collar button
   if (pattern === 'veins') {
     currentCollarColor = 'white'; // Force collar color to white
     document.getElementById('blackcollar').setAttribute('disabled', 'true'); // Disable black collar button
     // Refresh the image to reflect the change in collar color
     changeTshirt(currentBaseColor, currentSleeveColor, currentCollarColor, currentPattern, currentPatternColor);
   } else {
     // Enable black collar button for other patterns
     document.getElementById('blackcollar').removeAttribute('disabled');
   }
 }

 // Function to ensure the pattern color isn't the same as the base color
 function getDifferentPatternColor() {
   const availableColors = ['red', 'blue', 'green', 'orange', 'white', 'black'];
   // Filter out the current base color from available pattern colors
   const differentColors = availableColors.filter(color => color !== currentBaseColor);
   return differentColors[0]; // Return the first available color
 }

 // Function to update the visibility of pattern color buttons based on base color
 function updatePatternColorButtons() {
   const patternColorButtons = ['red', 'blue', 'green', 'orange', 'white', 'black'];
   patternColorButtons.forEach(color => {
     const button = document.getElementById(`patternColor${capitalize(color)}`); 
     if (color === currentBaseColor) {
       button.classList.add('hidden');
     } else {
       button.classList.remove('hidden');
     }
   });
 }

 // Function to change the pattern and handle pattern color button visibility
 function changePattern(pattern) {
   currentPattern = pattern;

   // If the pattern is 'essential', set pattern color to 'plain' and hide pattern color buttons
   if (pattern === 'essential') {
     currentPatternColor = 'plain';
     document.getElementById('patternColorButtons').classList.add('hidden');
   } else {
     // Set default pattern color to 'blue' for other patterns
     currentPatternColor = 'blue';
     document.getElementById('patternColorButtons').classList.remove('hidden');
   }

   // Update the T-shirt with the new pattern and current colors
   changeTshirt(currentBaseColor, currentSleeveColor, currentCollarColor, currentPattern, currentPatternColor);
 }

 // Capitalize the first letter of a string
 function capitalize(str) {
   return str.charAt(0).toUpperCase() + str.slice(1);
 }

 // On page load, hide pattern color buttons since 'essential' is default
 window.onload = function() {
   if (currentPattern === 'essential') {
     document.getElementById('patternColorButtons').classList.add('hidden');
   } else {
     updatePatternColorButtons();
   }
 };

 // Listen for input changes in the player name field
 document.getElementById('playerName').addEventListener('input', function () {
  let playerName = this.value.slice(0, 8); // Ensure max length of 8
  this.value = playerName; // Set truncated value if needed
  document.getElementById('playerNameDisplay').textContent = playerName; // Update name on jersey back
});


 // Listen for input changes in the player name field
 document.getElementById('playerNumber').addEventListener('input', function () {
  let playerNumber = this.value.slice(0, 2); // Ensure max length of 2
  this.value = playerNumber; // Set truncated value if needed
  document.getElementById('playerNumberDisplay').textContent = playerNumber; // Update name on jersey back
});






// Left Logo Elements----------------------------------------------
const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');
const leftLogoPreview = document.getElementById('leftLogoPreview');

// Click event to trigger file input for left logo
uploadBox.addEventListener('click', () => {
    fileInput.click();
});

// Show file name and update left logo preview when a file is selected
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameDisplay.textContent = `Selected Team Logo: ${file.name}`;
        displayLeftLogo(file);
    }
});

// Function to preview the left logo on T-shirt
function displayLeftLogo(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        leftLogoPreview.src = e.target.result;
        leftLogoPreview.style.display = 'block';  // Show the logo preview
    };
    reader.readAsDataURL(file);
}

// Left Logo Elements On Mobile-------------------------------------------
const uploadBoxMobile = document.getElementById('uploadBoxMobile');
const fileInputMobile = document.getElementById('fileInputMobile');
const fileNameDisplayMobile = document.getElementById('fileNameMobile');
const leftLogoPreviewMobile = document.getElementById('leftLogoPreview');

// Click event to trigger file input for left logo
uploadBoxMobile.addEventListener('click', () => {
  fileInputMobile.click();
});

// Show file name and update left logo preview when a file is selected
fileInputMobile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameDisplay.textContent = `Selected Team Logo: ${file.name}`;
        displayLeftLogo(file);
    }
});

// Function to preview the left logo on T-shirt
function displayLeftLogo(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      leftLogoPreviewMobile.src = e.target.result;
      leftLogoPreviewMobile.style.display = 'block';  // Show the logo preview
    };
    reader.readAsDataURL(file);
}





// Right-Side Logo Upload and Preview--------------------------------------------------------
const fileInput2 = document.getElementById("fileInput2");
const uploadBox2 = document.getElementById("uploadBox2");
const fileName2 = document.getElementById("fileName2");
const rightLogoPreview = document.createElement("img");

rightLogoPreview.id = "rightLogoPreview";
rightLogoPreview.style.position = "absolute";
rightLogoPreview.style.top = "24%";
rightLogoPreview.style.left = "54%"; // Positioned to the right side
rightLogoPreview.style.width = "30px";
rightLogoPreview.style.height = "30px";
rightLogoPreview.style.display = "none";
document.querySelector(".carousel-item.active").appendChild(rightLogoPreview);

// Trigger file input when the right logo upload box is clicked
uploadBox2.addEventListener("click", () => {
    fileInput2.click();
});

// Handle right logo file input change event
fileInput2.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/webp")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            rightLogoPreview.src = e.target.result;
            rightLogoPreview.style.display = "block"; // Show the right logo preview on the jersey
        };
        reader.readAsDataURL(file);

        // Display the file name
        fileName2.textContent = file.name;
    } else {
        alert("Please upload a valid PNG or WEBP file.");
    }
});
  

// Right-Side Logo Upload and Preview on Mobile--------------------------------------------------------
const fileInputMobile2 = document.getElementById("fileInputMobile2");
const uploadBoxMobile2 = document.getElementById("uploadBoxMobile2");
const fileNameMobile2 = document.getElementById("fileNameMobile2");
const rightLogoPreviewMobile = document.createElement("img");

rightLogoPreviewMobile.id = "rightLogoPreview";
rightLogoPreviewMobile.style.position = "absolute";
rightLogoPreviewMobile.style.top = "24%";
rightLogoPreviewMobile.style.left = "54%"; // Positioned to the right side
rightLogoPreviewMobile.style.width = "30px";
rightLogoPreviewMobile.style.height = "30px";
rightLogoPreviewMobile.style.display = "none";
document.querySelector(".carousel-item.active").appendChild(rightLogoPreviewMobile);

// Trigger file input when the right logo upload box is clicked
uploadBoxMobile2.addEventListener("click", () => {
    fileInputMobile2.click();
});

// Handle right logo file input change event
fileInputMobile2.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/webp")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            rightLogoPreviewMobile.src = e.target.result;
            rightLogoPreviewMobile.style.display = "block"; // Show the right logo preview on the jersey
        };
        reader.readAsDataURL(file);

        // Display the file name
        fileNameMobile2.textContent = file.name;
    } else {
        alert("Please upload a valid PNG or WEBP file.");
    }
});
  

// Variables to track current font style and color
let currentFontStyle = "Poppins";
let currentFontColor = "black"; // Default color

// Function to apply player details, including font changes
function applyPlayerDetails() {
    const playerName = document.getElementById("playerName").value.toUpperCase(); // Convert name to uppercase
    const playerNumber = document.getElementById("playerNumber").value.toUpperCase(); // Convert number to uppercase

    // Update player name and number display
    const playerNameDisplay = document.getElementById("playerNameDisplay");
    const playerNumberDisplay = document.getElementById("playerNumberDisplay");

    playerNameDisplay.innerText = playerName;
    playerNumberDisplay.innerText = playerNumber;

    // Apply font style and color
    playerNameDisplay.style.fontFamily = currentFontStyle;
    playerNumberDisplay.style.fontFamily = currentFontStyle;
    playerNameDisplay.style.color = currentFontColor; // Set font color
    playerNumberDisplay.style.color = currentFontColor; // Set font color
}

// Function to handle font change
function handleFontChange() {
    const fontTypeSelect = document.getElementById("fonttype");
    currentFontStyle = fontTypeSelect.value;
    applyPlayerDetails();
}

// Function to change font color
function changeFontColor(color) {
    currentFontColor = color; // Update current font color
    applyPlayerDetails(); // Reapply player details to update color
}

// Event listeners
document.getElementById("fonttype").addEventListener("change", handleFontChange);
document.getElementById("playerName").addEventListener("input", applyPlayerDetails);
document.getElementById("playerNumber").addEventListener("input", applyPlayerDetails);


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('playerDetails').checked = true;
});