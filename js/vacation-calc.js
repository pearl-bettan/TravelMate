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
    }
    if (document.getElementById('centerRadio').checked) {
        numRadioSelected = 1;   
    }

    if (document.getElementById('southRadio').checked) {
        numRadioSelected = 1;   
    }
    
    if (numRadioSelected==0) {
        submitButton.disabled = true;
        return;       
    }

    // בודק את כפתורי הצ׳ק בוקס, איזה מהם מסומן, אם אף אחד מהם לא מסומן אז מבטלים את האפשרות ללחוץ על כפתור השליחה
    let numCheckboxes = 0;
    if (document.getElementById('aloneCB').checked) {
        numCheckboxes = 1; 
    }
    if (document.getElementById('familyCB').checked) {
        numCheckboxes = 1;
    }
    if (document.getElementById('coupleCB').checked) {
        numCheckboxes = 1; 
    }
    if (document.getElementById('partyCB').checked) {
        numCheckboxes = 1;  
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

    const radioSelectedElement = document.querySelector('input[name="imageSelector"]:checked');
    const region = radioSelectedElement ? radioSelectedElement.value : 'לא נבחר אזור';

    const checkedBoxes = document.querySelectorAll('input[name="alphaChecker"]:checked');
    const vacationTypes = Array.from(checkedBoxes).map(cb => cb.value);

    // --- 2. Determine the Suggested Vacation Message (HTML formatted) ---
    let suggestionHTML = '';
    
    // Convert region value to human-readable Hebrew for the output
    let regionText = '';
    if (region === 'NorthImage') regionText = 'בצפון הארץ';
    else if (region === 'CenterImage') regionText = 'במרכז הארץ';
    else if (region === 'SouthImage') regionText = 'בדרום הארץ';
    
    
    if (vacationTypes.includes("חופשה משפחתית") && region === "CenterImage") {
        suggestionHTML = `
            <p><strong>שלום ${fullName},</strong></p>
            <p><strong>אנו ממליצים:</strong> חופשה של פארקים ומוזיאונים 
            ידידותיים למשפחות ${regionText}.</p>
        `;
    } else if (vacationTypes.includes("חופשה זוגית") && region === "NorthImage") {
        suggestionHTML = `
            <p><strong>שלום ${fullName},</strong></p>
            <p><strong>אנו ממליצים:</strong> צימר רומנטי מבודד בגליל 
            ${regionText}.</p>
        `;
    } else if (region === "SouthImage" && (vacationTypes.includes("חופשה עם החבר'ה") || vacationTypes.includes("חופשה לכל"))) {
        suggestionHTML = `
            <p><strong>שלום ${fullName},</strong></p>
            <p><strong>אנו ממליצים:</strong> טיול ג'יפים ולינת שטח 
            במדבר ${regionText}.</p>
        `;
    } else {
         suggestionHTML = `
            <p><strong>שלום ${fullName},</strong></p>
            <p>אנחנו מעבדים את הנתונים! האימייל שלך (${email}) נקלט. 
            בהתבסס על ההעדפות שלך (${vacationTypes.join(' ו-')}), 
            ניצור איתך קשר בהקדם עם ההמלצה המושלמת.</p>
        `;
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
