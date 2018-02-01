/* JAVASCRIPT FUNCTIONS ONLY */

// Replace Discord Background Image function
function replaceDiscordBackground(bgImage){
	
	// Identify discord background-element
    var backgroundElement = document.getElementById('app-mount');

    // If the background element doesn't exist, repeat the process after 250ms 
    if(!backgroundElement) {
    	setTimeout(replaceDiscordBackground, 250); 
    }
    else {
    	
    	// Set image
        backgroundElement.style.backgroundImage = bgImage;
        
        // Set transparency
        backgroundElement.style.backgroundColor = "rgba(255, 0, 0, 0.15);";

        // Set CSS background to cover
        backgroundElement.style.backgroundSize = "cover";
    }
}

// Change the image to a new one that the user provided
function setImage(bgImage) {
    
    // Set Cookie
    chrome.cookies.set({name:bgExtCookie,url:"https://discordapp.com/channels/",value:"url(" + bgImage + ")"});

    // Execute script
    chrome.tabs.executeScript(null,{code:"replaceDiscordBackground('"+bgImage+"')"});
}

function changeImage() {
    return true;
}

// // Collect image input
// var imageInput = document.getElementById('imageInput');

// // Replace as needed
// if(imageInput.value != "") {
//     bgImage = imageInput;
// }

/* RUN JAVASCRIPTS COMMANDS FROM HERE */

// Set default values
var bgExtCookie = "discordExt_bgImage";

// Set bgImage
var bgImage = "https://lh5.ggpht.com/lmue-B8Wo2Sa05MlCF2cMFlYEOJPzZDfLkVg4Gzsgsbo5-MiSrj5nA0MER8HJkqXPl4=h900";

try {
    // See if there's already an image set
    chrome.cookies.get({"url":"https://discordapp.com/channels/","name":bgExtCookie},
        
        // Function based on cookies returned
        (cookie) => {
            
            // Did you find the cookie
            if(cookie) {
                
                // Return bgImage
                console.log(cookie.value);

                // Collect cookie value
                bgImage = cookie.value;

                // Process image
                chrome.tabs.executeScript(null,{code:"replaceDiscordBackground('"+bgImage+"')"});
            
            } else {
                // If we couldn't find the cookie, then
                // set image data to cookie
                setImage(bgImage);
            }

    }); // End of get cookies
}
catch (error) {
    console.log(error);
}

// // Go through the tabs and return the tab ID and URL of all tabs that are discord
// chrome.tabs.query({url:"https://discordapp.com/channels/*"},(sites) => {});

// Add event listener to the button
document.addEventListener('DOMContentLoaded', function () {

	// Capture the button
	var button = document.getElementById('imageButton');

	// Attach event listener to button (of type "click", and route to function changeImage)
	button.addEventListener('click', changeImage);
});