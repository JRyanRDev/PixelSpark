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

window.addEventListener("scroll", () => {
    if(window.scrollY >= header_height) {
        menu.classList.add("sticky");
    }
    else {
        menu.classList.remove("sticky");
        
    }
})


