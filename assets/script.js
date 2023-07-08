function openMenu() {
    if (menu.style.display == "none") {
        menu.style.display = "block";
    }
}

const header = document.querySelector("header");
const header_height = header.scrollHeight;
const menuButton = document.getElementById("menuButton");
const menu = document.querySelector("div#header-menu");
const menu_height = menu.scrollHeight;


menuButton.addEventListener("click", () => {
    if (menu.style.display == "none") {
        menu.style.display = "block";
    }
    else {
        menu.style.display = "none";
    }
})



