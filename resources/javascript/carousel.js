const nextButton = document.getElementById("rightButton");
const lastButton = document.getElementById("leftButton");
const carouselUl = document.getElementById("carouselUl");
const liElements = document.getElementsByClassName("carouselImg");

/* make display: none imgages visible depending on width of scree */
window.addEventListener("load", () => {
    if (window.screen.width >= 768) {
        liElements[1].style.display = "list-item";
        liElements[9].style.display = "list-item";
    }
    if (window.screen.width >= 1025) {
        liElements[0].style.display = "list-item";
        liElements[10].style.display = "list-item";
    }
})


let currentImg = 1;
/* 
if (window.screen.width >= 1025) {
    currentImg = 3;
} else if (window.screen.width >= 768) {
    currentImg = 2;
} else {
    currentImg = 1;
} */

// Show the right image
const showRightImg = () => {
    //TODO: figure out how to keep the animation all the way right even if someone clicks through them quickly
    if (currentImg == 7) {
        /* Just in case someone clicks through quickly i have to manually reset it, it doesn't work else */
        currentImg = window.screen.width >= 768 ? 1 : 0;
    }
    if (currentImg == -1)  {
        /* failsafe for quick clicking */
        currentImg = window.screen.width >= 768 ? 6 : 5;
    }

    if (carouselUl.style.transition == "none") { //in case handleEndTransition changed it to none beforehand
        carouselUl.style.transition = "transform 0.5s ease";
    }
    
    carouselUl.style.setProperty("--i", i = currentImg); //sets index, changes css to only show certain part of the container
}


const handleEndTransition = () => {
    if(swipeInterval){ //no idea something just wasn't working
    }

    /* for infinite looping the first and last li elements are double (0 = 5; 1 = 6;)
    after they transition nicely with showRightImg here they will be reset to their actual index without any transition*/
    if (currentImg == 6) { 
        currentImg = 1;
    }
    if (currentImg == 0) {
        currentImg = 5;
    }

    carouselUl.style.transition = "none";
    carouselUl.style.setProperty("--i", i = currentImg);
}

/* swipe image based on time */
let swipeInterval = null;

const handleAddInterval = () => {
    if (swipeInterval == null) {
        swipeInterval = setInterval(() => {
            currentImg++;
            showRightImg();
        },5000);
    }
}

window.addEventListener("load", handleAddInterval);

//Click events
//moves index up and down
const handleClick = (event) => {
    event.stopPropagation();

    if(swipeInterval){ //stop interval so it wont swipe right after you click
        clearInterval(swipeInterval);
        swipeInterval = null;
    }

    if (event.target.classList[0] == "leftButton") {
            currentImg--;
    } else {
        currentImg++;
    }

    showRightImg();
    handleAddInterval();
}

nextButton.addEventListener("pointerdown", handleClick);
lastButton.addEventListener("pointerdown", handleClick);
carouselUl.addEventListener("transitionend", handleEndTransition);

//add the touch events

const carouselContainer = document.getElementById("carousel");

let touchstartX = 0;
let touchmoveX = 0;
let touchendX = 0;

const handleTouchStart = (event) => {
    touchstartX = event.changedTouches[0].screenX;
}

//for smooth touch scrolling
const handleTouchMove = (event) => {
    touchmoveX = event.changedTouches[0].screenX;
    let touchchange = (touchstartX - touchmoveX) + "px";
    
    carouselUl.style.setProperty("--touch", touchchange);
}
 
const handleTouchEnd = (event) => {
    if(swipeInterval){ //stop interval so it wont swipe right after you click
        clearInterval(swipeInterval);
        swipeInterval = null;
    }

    touchendX = event.changedTouches[0].screenX;

    if (touchendX < touchstartX) {
        currentImg++;
    } else if (touchendX > touchstartX) {
        currentImg--;
    }

    //reset touch variable to 0 and skip to new image
    carouselUl.style.setProperty("--touch", "0px");
    showRightImg();
    handleAddInterval();
}

carouselContainer.addEventListener("touchstart", handleTouchStart);
carouselContainer.addEventListener("touchmove", handleTouchMove);
carouselContainer.addEventListener("touchend", handleTouchEnd);
