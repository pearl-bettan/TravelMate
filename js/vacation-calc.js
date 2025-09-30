let regionsSelected = null; // משתנה גלובלי לשמירת האזור שנבחר
let aloneVacationTypesSelected = 0; 
let partyVacationTypesSelected = 0;
let coupleVacationTypesSelected = 0;
let familyVacationTypesSelected = 0;

// מסתיר את כל התמונות ולאחר מכן מציג את התמונה המתאימה לכפתור הבחירה שנבחר./
function showImage(imageIdToShow) {
    // Step 1: Hide all images by setting display to 'none'.
   document.getElementById("northImage").style.display = 'none';
    document.getElementById("centerImage").style.display = 'none';
    document.getElementById("southImage").style.display = 'none';
    
    // Step 2: Get the specific image element to show.
    const selectedImage = document.getElementById(imageIdToShow);

    // Step 3: Check if the element exists and show it (set display to 'block').
    if (selectedImage) {
        selectedImage.style.display = 'block';
    }
}

/**
 * * מחליף את השקיפות של התמונה בהתאם לסימון המשתמש.
אם התמונה בחורה אז = אטומה (שקיפות 1)
אחרת- התמונה בשקיפות (0.4)
 */
function toggleOpacity(imageId, isChecked) {
    const imageElement = document.getElementById(imageId);
    if (!imageElement) return;

    // Set the opacity based on the checkbox state
    if (isChecked) { 
        imageElement.style.opacity ='1.0';
    }
    else {
        imageElement.style.opacity ='0.4';
    }
}
/*
בודק את מצב כל הקלטים שהוזנו (טקסט, אפשרויות בחירה, תיבת סימון)
כדי להפעיל/להסתיר את כפתור השליחה.
 */
function checkButtonState() {
    const submitButton = document.getElementById('submitButton');
    if (submitButton == null) return;

    // בדיקה האם המשתמש הזין שם,מייל וטלפון
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
   if (fullName == null || fullName.checkValidity()==false) {
       submitButton.disabled = true;
       return;
   }
   if (email == null || email.checkValidity()==false) {
        submitButton.disabled = true;
       return;   
   }
    if (phone== null || phone.checkValidity()==false) {
      submitButton.disabled = true;
       return;     
    }
    
    // בודק את כפתורי הרדיו, איזה מהם מסומן, אם אף אחד מהם לא מסומן אז מבטלים את האפשרות ללחוץ על כפתור השליחה
    let numRadioSelected = 0;
    if (document.getElementById('northRadio').checked) {
        numRadioSelected = 1;
        regionsSelected = "north"; // שמירת האזור שנבחר  
    }
    if (document.getElementById('centerRadio').checked) {
        numRadioSelected = 1;   
        regionsSelected = "center"; // שמירת האזור שנבחר 
    }

    if (document.getElementById('southRadio').checked) {
        numRadioSelected = 1;  
        regionsSelected = "south"; // שמירת האזור שנבחר  
    }
    
    if (numRadioSelected==0) {
        submitButton.disabled = true;
        return;       
    }

    // בודק את כפתורי הצ׳ק בוקס, איזה מהם מסומן, אם אף אחד מהם לא מסומן אז מבטלים את האפשרות ללחוץ על כפתור השליחה
    let numCheckboxes = 0;
    aloneVacationTypesSelected = 0; 
    partyVacationTypesSelected = 0;
    coupleVacationTypesSelected = 0;
    familyVacationTypesSelected = 0;
    if (document.getElementById('aloneCB').checked) {
        numCheckboxes = 1; 
        aloneVacationTypesSelected = 1;
    }
    if (document.getElementById('familyCB').checked) {
        numCheckboxes = 1;
        familyVacationTypesSelected = 1;
    }
    if (document.getElementById('coupleCB').checked) {
        numCheckboxes = 1;
        coupleVacationTypesSelected = 1;
    }
    if (document.getElementById('partyCB').checked) {
        numCheckboxes = 1;
        partyVacationTypesSelected = 1;
    }
    if (numCheckboxes==0) {
        submitButton.disabled = true;
        return;       
    }
        
    //המשתמש הזין את כל הפרטים הנרדשים, מתאפשרת לחיצה על כפתור ה״שלח״
    submitButton.disabled = false; 
}
// =========================================================
// NEW: MODAL CONTROL FUNCTIONS
// =========================================================

/**
 * Closes the custom modal dialog.
 */
function closeModal() {
    document.getElementById('customAlertModal').style.display = 'none';
}

// =========================================================
// NEW: HANDLE FORM SUBMISSION AND DISPLAY MODAL
// =========================================================

/**
 * Intercepts the form submission, gathers data, displays the custom modal,
 * and prevents navigation to 'result.html'.
 * @param {Event} event - The submission event.
 * @returns {boolean} Always returns false to prevent default form submission.
 */
function handleFormSubmit(event) {
    // Stop the form from navigating
    event.preventDefault(); 

    // Ensure all required fields are valid before proceeding (safety check)
    if (document.getElementById('submitButton').disabled) {
        // This should not happen if the button is enabled correctly, but useful for robustness
        return false;
    }

    // --- 1. Gather Required Data ---
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    let suggestionHTML = `<p><strong>שלום ${fullName},</strong></p>` +
    `<p><strong>חופשה המושלמת בשבילך:</strong></p>`;
    if (regionsSelected === 'north'){
        if (aloneVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה בצפון הארץ לבד ורגוע באוהל בחוף גינוסר הכנרת!</strong> .</p>
        `;
        }
        if (familyVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה בצפון הארץ עם כל המשפחה בקראוון בחוף גולן!</strong> .</p>
        `;
        }
        if (partyVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה בצפון הארץ עם כל החבר׳ה בקמפינג בפארק הירדן!</strong> .</p>
        `;
        }
        if (coupleVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה זוגית בצפון הארץ במלון כנען ספא שבצפת!</strong> .</p>
        `;
        }
    } 
    else if (regionsSelected === 'center'){
        if (aloneVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה במרכז הארץ לבד ורגוע באוהל בחוות הברבור!</strong> .</p>
        `;
        }
        if (familyVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה במרכז הארץ עם כל המשפחה בקראוון בחוף הדקלים!</strong> .</p>
        `;
        }
        if (partyVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה במרכז הארץ עם כל החבר׳ה בקמפינג בחוף פלמחים!</strong> .</p>
        `;
        }
        if (coupleVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה זוגית במרכז הארץ במלון סטאי שבתל אביב!</strong> .</p>
        `;
        }   
    } 
    else if (regionsSelected === 'south'){
        if (aloneVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה בדרום הארץ לבד ורגוע באוהל בחוף הדקל!</strong> .</p>
        `;
        }
        if (familyVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה בדרום הארץ עם כל המשפחה בקראוון בפארק הצפרות!</strong> .</p>
        `;
        }
        if (partyVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה בדרום הארץ עם כל החבר׳ה בקמפינג בחוף המגדלור!</strong> .</p>
        `;
        }
        if (coupleVacationTypesSelected){
            suggestionHTML += `
            <p><strong> חופשה זוגית בדרום הארץ במלון בראשית שבמצפה רמון!</strong> .</p>
        `;
        }   
    }


    // --- 3. Update the Modal Content and Display It ---
    const modal = document.getElementById('customAlertModal');
    const contentArea = document.getElementById('modalContentArea');

    contentArea.innerHTML = suggestionHTML;
    modal.style.display = 'flex'; // Change from 'none' to 'flex' to display the modal
    
    return false; 
}


//מאזין לשינוי בכפתורים, DOMContentLoaded=מאזין לכפתורים ולא לכל המסמך
document.addEventListener('DOMContentLoaded', checkButtonState);

// מאזין לתיבות הטקסט
document.getElementById("full-name").addEventListener('input', checkButtonState); 
document.getElementById("full-name").addEventListener('change', checkButtonState); 

document.getElementById("email").addEventListener('input', checkButtonState); 
document.getElementById("email").addEventListener('change', checkButtonState); 

document.getElementById("phone").addEventListener('input', checkButtonState); 
document.getElementById("phone").addEventListener('change', checkButtonState); 
