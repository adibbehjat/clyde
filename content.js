var bckrndImg = "url(https://lh5.ggpht.com/lmue-B8Wo2Sa05MlCF2cMFlYEOJPzZDfLkVg4Gzsgsbo5-MiSrj5nA0MER8HJkqXPl4=h900)";
function findThing(){
    var foundElement = document.getElementsByClassName('appMount-14L89u');
    if(!foundElement[0]) { setTimeout(findThing, 250); }
    else {
        foundElement[0].style.backgroundImage = bckrndImg;
        foundElement[0].style.backgroundColor = "rgba(255, 0, 0, 0.15);";
    }
}
findThing();

imageButton.onclick = function() {

    bckrndImg = "url(" + imageInput.value + ")"
    findThing()

}