const header = document.getElementById("header");

let lastScrollY = 0;
let translateY = 0;
let headerHeight = header.clientHeight;

/*  */
function handleHeaderScroll () {
    const currentScrollY = window.scrollY;
    const diffY = currentScrollY - lastScrollY;

    /* calculates difference between currentScroll and the last scroll and then subtracts that from the previous translateY value */

    translateY = translateY - diffY;

    /* makes sure translateY stays between -headerHEight and 0 */
    translateY = Math.max(-headerHeight, Math.min(0, translateY));
    header.style.transform = `translateY(${translateY}px)`;

    /* update lastScrollY */
    lastScrollY = currentScrollY;
}

window.addEventListener("scroll", handleHeaderScroll);

/* add margiin-top to banner that's the height of header */
window.addEventListener("load", () => {
    document.getElementById("banner").style.transform = `translateY(${headerHeight}px)`;
})