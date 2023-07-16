// Variáveis globais
const itemsPerPage = 12;
let currentPage = 1;
let totalPages = 0;
let jsonData = [];

// Carregar os dados JSON
const jsonUrl = "assets/js/json/news.json";
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

// Função para criar a grade de conteúdo
function createGrid(page) {
  const gridContainer = document.querySelector("div#content");
  gridContainer.innerHTML = "";

  // Calcula o índice inicial e final dos itens com base na página atual
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Percorre os itens para criar a grade
  for (let i = startIndex; i < endIndex && i < jsonData.length; i++) {
    const item = jsonData[i];

    // Cria um elemento para o item e adiciona à grade
    const itemElement = document.createElement("article");
    const imageSpace = document.createElement("div");
    const textSpace = document.createElement("div");
    const textTitle = document.createElement("h4");
    const description = document.createElement("p");

    textTitle.innerText = jsonData[i].título;
    description.innerText = jsonData[i].texto;

    itemElement.classList.add("extra-article");
    imageSpace.classList.add("post-image");
    textSpace.classList.add("info");

    textSpace.appendChild(textTitle);
    textSpace.appendChild(description);
    itemElement.appendChild(imageSpace);
    itemElement.appendChild(textSpace);
    gridContainer.appendChild(itemElement);
  }
}

// Função para atualizar os controles de paginação
function updatePagination() {
  const prevButton = document.querySelector("button.previous-button");
  const nextButton = document.querySelector("button.next-button");
  const paginationContainer = document.querySelector("div.pagination-numbers");

  // Remove os botões de página anteriores
  paginationContainer.innerHTML = "";

  // Desabilita o botão 'Anterior' se estiver na primeira página
  prevButton.disabled = currentPage === 1;

  // Desabilita o botão 'Próximo' se estiver na última página
  nextButton.disabled = currentPage === totalPages;

  // Cria os botões de número das páginas
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("pagination-number");

    // Marca o botão da página atual
    if (i === currentPage) {
      pageButton.classList.add("active");
    }

    // Adiciona o manipulador de evento para ir para a página clicada
    pageButton.addEventListener("click", function() {
      goToPage(i);
    });

    paginationContainer.appendChild(pageButton);
  }
}

// Função para ir para uma página específica
function goToPage(page) {
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    createGrid(currentPage);
    updatePagination();
  }
}

// Função para ir para a página anterior
function goToPreviousPage() {
  goToPage(currentPage - 1);
}

// Função para ir para a próxima página
function goToNextPage() {
  goToPage(currentPage + 1);
}

// Função principal para inicializar o sistema de paginação
function initPagination() {
  totalPages = Math.ceil(jsonData.length / itemsPerPage);

  // Adiciona os manipuladores de eventos aos botões de navegação
  const prevButton = document.querySelector("button.previous-button");
  const nextButton = document.querySelector("button.next-button");
  prevButton.addEventListener("click", goToPreviousPage);
  nextButton.addEventListener("click", goToNextPage);

  createGrid(currentPage);
  updatePagination();
}

// Inicializa o sistema de paginação
initPagination();
