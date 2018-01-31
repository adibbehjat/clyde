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

// When user sets a new background image
function changeImage() {

    // Collect image input
    var imageInput = document.getElementById('imageInput');
    
    // Set Cookie
	chrome.cookies.set({"name":"discordExt_bgImage","url":"https://discordapp.com/channels/","value":"url(" + imageInput.value + ")"});

	// Replace image
    bgImage = chrome.cookies.get("bgImage");

    // Ask it to execute the code for the tab
    chrome.tabs.executeScript(null,{code:"replaceDiscordBackground('"+bgImage+"')"});

    // Close extension window
    window.close();

}

/* RUN JAVASCRIPTS COMMANDS FROM HERE */

// Set default value
var bgImage = "url(https://lh5.ggpht.com/lmue-B8Wo2Sa05MlCF2cMFlYEOJPzZDfLkVg4Gzsgsbo5-MiSrj5nA0MER8HJkqXPl4=h900)";

// Go through the select tab and return the tab ID and URL
chrome.tabs.getSelected(null, function(tab) {


    var tabID = tab.id;
    var tabURL = tab.url;
    
    // Check and see if we have an existing cookie.
    bgImage = chrome.cookies.get({ url: tabURL, name: 'discordExt_bgImage' }, function (cookie) {
        if (cookie) {
            // Return value if cookie exists
            return cookie.value;
        }
    });


});

// Run the function the first time
replaceDiscordBackground(bgImage);

// Add event listener to the button
document.addEventListener('DOMContentLoaded', function () {

	// Capture the button
	var button = document.getElementById('imageButton');

	// Attach event listener to button (of type "click", and route to function changeImage)
	button.addEventListener('click', changeImage);
});