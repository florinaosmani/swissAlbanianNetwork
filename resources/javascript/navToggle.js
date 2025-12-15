const navToggleOpen = document.getElementById("navToggleOpen");
const navToggleClose = document.getElementById("navToggleClose");
const dropdownMenu = document.getElementById("dropdownMenu");

let isOpen = false;

const handleToggleNav = () => {
    isOpen = !isOpen;

    if (isOpen) {
        navToggleOpen.style.display = "none";
        navToggleClose.style.display = "block";
        dropdownMenu.classList.add("open");
    } else {
        navToggleOpen.style.display = "block";
        navToggleClose.style.display = "none";
        dropdownMenu.classList.remove("open");
    }
}

navToggleOpen.addEventListener("click", handleToggleNav);
navToggleClose.addEventListener("click", handleToggleNav);