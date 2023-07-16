const itemsPerPage = 6;
let currentPage = 1;
let totalPages = 0;
let jsonData = [];

const jsonUrl = "assets/js/json/articles.json";
var request = new XMLHttpRequest();
request.open("get", jsonUrl);

request.onload = function() {
  if (request.status === 200) {
    jsonData = JSON.parse(request.responseText);
    initPagination();
  } else {
    console.error("Falha ao carregar o arquivo JSON.");
  }
};

request.send();


function createGrid(page) {
  const gridContainer = document.querySelector("div#content");
  gridContainer.innerHTML = "";

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < jsonData.length; i++) {

    const itemElement = document.createElement("article");
    const imageSpace = document.createElement("div");
    const textSpace = document.createElement("div");
    const textTitle = document.createElement("h3");
    const description = document.createElement("p");

    textTitle.innerText = jsonData[i].título;
    description.innerText = jsonData[i].texto;

    itemElement.classList.add("post");
    imageSpace.classList.add("image-space");
    textSpace.classList.add("title-space");

    textSpace.appendChild(textTitle);
    textSpace.appendChild(description);
    itemElement.appendChild(imageSpace);
    itemElement.appendChild(textSpace);
    gridContainer.appendChild(itemElement);
  }
}


function updatePagination() {
  const prevButton = document.querySelector("button.previous-button");
  const nextButton = document.querySelector("button.next-button");
  const paginationContainer = document.querySelector("div.pagination-numbers");

  paginationContainer.innerHTML = "";

  prevButton.disabled = currentPage === 1;

  nextButton.disabled = currentPage === totalPages;


  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("pagination-number");

        if (i === currentPage) {
        pageButton.classList.add("active");
    }

    pageButton.addEventListener("click", function() {
      goToPage(i);
    });

    paginationContainer.appendChild(pageButton);
  }
}


function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    createGrid(currentPage);
    updatePagination();
  }
}


function goToPreviousPage() {
  goToPage(currentPage - 1);
}


function goToNextPage() {
  goToPage(currentPage + 1);
}


function initPagination() {
  totalPages = Math.ceil(jsonData.length / itemsPerPage);

  
  const prevButton = document.querySelector("button.previous-button");
  const nextButton = document.querySelector("button.next-button");
  prevButton.addEventListener("click", goToPreviousPage);
  nextButton.addEventListener("click", goToNextPage);

  createGrid(currentPage);
  updatePagination();
}


initPagination();
