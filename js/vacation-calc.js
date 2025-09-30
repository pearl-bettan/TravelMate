// =========================================================
// RADIO BUTTON IMAGE SELECTOR
// =========================================================

// Get all radio-controlled image elements that are part of the main group.
const allImages = document.querySelectorAll(
    '#northImage, #centerImage, #southImage'
);

/**
 * Hides all main images and then shows the one corresponding to the selected radio button.
 * @param {string} imageIdToShow - The ID of the image element to display (e.g., 'NorthImage').
 */
function showImage(imageIdToShow) {
    // Step 1: Hide all images by setting display to 'none'.
    allImages.forEach(img => {
        img.style.display = 'none';
    });

    // Step 2: Get the specific image element to show.
    const selectedImage = document.getElementById(imageIdToShow);

    // Step 3: Check if the element exists and show it (set display to 'block').
    if (selectedImage) {
        selectedImage.style.display = 'block';
    }
}


// =========================================================
// CHECKBOX OPACITY TOGGLE
// =========================================================

/**
 * Toggles the opacity of a specified image element based on checkbox state.
 * @param {string} imageId - The ID of the image element (e.g., 'alphaImg1').
 * @param {boolean} isChecked - True if the checkbox is checked, false otherwise.
 */
function toggleOpacity(imageId, isChecked) {
    const imageElement = document.getElementById(imageId);
    if (!imageElement) return;

    // Set the opacity based on the checkbox state
    imageElement.style.opacity = isChecked ? '1.0' : '0.4';
}


// =========================================================
// BUTTON ENABLING LOGIC (UPDATED TO INCLUDE TEXT FIELDS)
// =========================================================

/**
 * Checks the state of all required inputs (text, radio, checkbox)
 * to enable/disable the submit button.
 */
function checkButtonState() {
    const submitButton = document.getElementById('submitButton');
    if (!submitButton) return;

    // --- 1. Check Text Inputs (Name, Email, Phone) ---
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    // Use checkValidity() to confirm fields are not empty and pass HTML validation (like required, email format, or pattern).
    // Note: If any element is null (not found), this check will return false, which is safe.
    const textInputsValid = fullName && fullName.checkValidity() && 
                           email && email.checkValidity() && 
                           phone && phone.checkValidity();

    // --- 2. Check Radio Buttons (name="imageSelector") ---
    const radioSelected = document.querySelector('input[name="imageSelector"]:checked') !== null;

    // --- 3. Check Checkboxes (name="alphaChecker") ---
    const checkboxSelected = document.querySelector('input[name="alphaChecker"]:checked') !== null;
    
    // --- 4. Determine if the button should be enabled ---
    // ALL conditions must be true: (Text Fields Valid) AND (Radio Selected) AND (Checkbox Selected)
    const enableButton = textInputsValid && radioSelected && checkboxSelected;

    // --- 5. Update the button's disabled state ---
    submitButton.disabled = !enableButton;
}

// Ensure the button state is checked when the page first loads
document.addEventListener('DOMContentLoaded', checkButtonState);

// Attach the checkButtonState to input events for real-time validation feedback.
// This is critical for text fields since they don't have an 'onclick' event.
const textInputs = document.querySelectorAll('#full-name, #email, #phone');
textInputs.forEach(input => {
    // 'input' event captures changes immediately (typing)
    // 'change' event captures when focus is lost (tabbing away)
    input.addEventListener('input', checkButtonState); 
    input.addEventListener('change', checkButtonState);
});

// The radio buttons and checkboxes already call checkButtonState on 'onclick' in the HTML.