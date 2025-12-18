const button = document.getElementById("goennerButton");

const throttle = (callbackFn, limit) => {
    let wait = false;
    return function (...args) {
        if (!wait) {
            callbackFn(...args);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    }
}

//no timeout set
let scrollTimeout = null;

const handleShowButton = () => {
    //every time user scrolls the button hides
    button.classList.remove("show");

    //if there has been a previous timeout set cancel it
    clearTimeout(scrollTimeout);

    //set new timeout, if the user stops scrolling it won't be cleared again and will run the function in the given delay time
    scrollTimeout = setTimeout(() => {
        button.classList.add("show");
    }, 5000);
}


window.addEventListener("scroll", throttle(handleShowButton, 500));