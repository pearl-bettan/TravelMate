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
//מאזין לשינוי בכפתורים, DOMContentLoaded=מאזין לכפתורים ולא לכל המסמך
document.addEventListener('DOMContentLoaded', checkButtonState);


// מאזין לתיבות הטקסט
document.getElementById("full-name").addEventListener('input', checkButtonState); 
document.getElementById("full-name").addEventListener('change', checkButtonState); 

document.getElementById("email").addEventListener('input', checkButtonState); 
document.getElementById("email").addEventListener('change', checkButtonState); 

document.getElementById("phone").addEventListener('input', checkButtonState); 
document.getElementById("phone").addEventListener('change', checkButtonState); 
