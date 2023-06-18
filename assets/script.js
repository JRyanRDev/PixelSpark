function openMenu() {
    if (menu.style.display == "none") {
        menu.style.display = "block";
    }
}

const menuButton = document.getElementById("menuButton");
const menu = document.querySelector("div#header-menu");

menuButton.addEventListener("click", () => {
    if (menu.style.display == "none") {
        menu.style.display = "block";
    }
    else {
        menu.style.display = "none";
    }
})