const nextButton = document.getElementById("rightButton");
const lastButton = document.getElementById("leftButton");
const carouselUl = document.getElementById("carouselUl");

let currentImg = 1;

// Show the right image
const showRightImg = () => {
    //TODO: figure out how to keep the animation all the way right even if someone clicks through them quickly
    if (currentImg == 7) {
        /* Just in case someone clicks through quickly it doesn't work else */
        currentImg = 0;
    }
    if (currentImg == -1)  {
        /* failsafe for quick clicking */
        currentImg = 5;
    }

    if (carouselUl.style.transition == "none") {
        carouselUl.style.transition = "transform 0.5s ease";
    }
    
    carouselUl.style.setProperty("--i", i = currentImg);
}

const handleEndTransition = () => {
    if (currentImg == 6) {
        currentImg = 1;
    }
    if (currentImg == 0) {
        currentImg = 5;
    }

    carouselUl.style.transition = "none";
    carouselUl.style.setProperty("--i", i = currentImg);
}

//Click events
const handleClick = (event) => {
    event.stopPropagation();
    if (event.target.classList[0] == "leftButton") {
            currentImg--;
    } else {
        currentImg++;
    }

    showRightImg();
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

const handleTouchMove = (event) => {
    touchmoveX = event.changedTouches[0].screenX;
    let touchchange = (touchstartX - touchmoveX) + "px";
    
    carouselUl.style.setProperty("--touch", touchchange);
}
 
const handleTouchEnd = (event) => {
    touchendX = event.changedTouches[0].screenX;

    if (touchendX < touchstartX) {
        currentImg++;
    } else if (touchendX > touchstartX) {
        currentImg--;
    }

    carouselUl.style.setProperty("--touch", "0px");
    showRightImg();
}

carouselContainer.addEventListener("touchstart", handleTouchStart);
carouselContainer.addEventListener("touchmove", handleTouchMove);
carouselContainer.addEventListener("touchend", handleTouchEnd);

