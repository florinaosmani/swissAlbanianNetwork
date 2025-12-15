const navLinks = document.getElementsByClassName("navlink");

const handleSwitchActive = () => {
    /* takes the url and splits it so you only get the part which is different for every navLink */
    const urlSplit = window.location.href.split("/");
    const linkText = urlSplit[urlSplit.length -1].split(".")[0]; 

    /* splits each navLink's href so it can match the previous split url; if it matches it adds
    active to the classList, if it doesn't it removes it */
    /* TODO: Check whether this applies whenever the site is hosted, might need to make changes on how to split the URL */
    for (let i = 0; i < navLinks.length; i++){
            let navLinkHrefSplit = navLinks[i].href.split("/");
            let navText = navLinkHrefSplit[navLinkHrefSplit.length - 1].split(".")[0];
            
            if (navText == linkText) {
                navLinks[i].classList.add("active");
            } else {
                navLinks[i].classList.remove("active");
            }
        }
}

window.addEventListener("load", handleSwitchActive); //runs every time the window loads (every time you click on a new link)
/*  
Previous Tries:

const handleSwitchActive = (event) => {
    for (let i = 0; i < navLinks.length; i++){
        navLinks[i].classList.remove("active");
    }

    const eventHrefSplit = event.target.href.split("/");
    const eventText = eventHrefSplit[eventHrefSplit.length -1].split(".")[0];

    for (let i = 0; i < navLinks.length; i++){
            let navLinkHrefSplit = navLinks[i].href.split("/");
            let navText = navLinkHrefSplit[navLinkHrefSplit.length - 1].split(".")[0];
            
            if (navText == eventText) {
                navLinks[i].classList.add("active");
                console.log("i added");
            }
        }

    let urlSplit = window.location.href.split("/");
    let linkText = urlSplit[urlSplit.length -1].split(".")[0];

    for (let i = 0; i < navLinks.length; i++){
            let navLinkHrefSplit = navLinks[i].href.split("/");
            let navText = navLinkHrefSplit[navLinkHrefSplit.length - 1].split(".")[0];
            
            if (navText == linkText) {
                navLinks[i].classList.add("active");
            }
        }
};

for (let i = 0; i < navLinks.length; i++){
    navLinks[i].addEventListener("click", handleSwitchActive);
} */
