// Declaramos la variable que va a contener los libros

const myLibrary = [];

// Declaramos la clase para hacer los libros

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
      return `${this.title} by ${this.author}, ${this.pages}. ${this.read}`;
    };
  }
}

// Declaramos variables para los elementos del form

const showModalBtn = document.getElementById("showModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const bookForm = document.getElementById("bookForm");
const bookModal = document.getElementById("bookModal");
const bookDataContainer = document.getElementById("cards_container");


// Esta función es para mostrar el modal

showModalBtn.addEventListener("click", () => {
  bookModal.showModal();
});

// Esta función es para cerrar el modal

closeModalBtn.addEventListener("click", () => {
  bookModal.close();
});

// Esta función es para cuando se envía el form.

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookName = document.getElementById("bookName").value;
  const bookAuthor = document.getElementById("bookAuthor").value;
  const bookPages = document.getElementById("bookPages").value;
  const readValue = document.getElementById("bookRead").checked ? "Yes" : "No";

  // Creamos un nuevo objeto "Book" y lo añadimos al array myLibrary
  const newBook = new Book(bookName, bookAuthor, bookPages, readValue);
  myLibrary.push(newBook);

  // Limpiamos el form después de añadir el nuevo libro
  bookForm.reset();

  // Actualizamos cómo se visualiza la biblioteca y cerramos el modal
  displayLibrary();
  bookModal.close();
});

// Esta función actualiza la visualización de la biblioteca

function displayLibrary() {
  // Borramos el contenido actual en bookDataContainer (cards_container)
  bookDataContainer.innerHTML = "";

  // Itera sobre el array myLibrary y muestra cada libro en la interfaz
  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.className = "card";

    const cardContent = document.createElement("div");
    cardContent.className = "card_content";

    const titleLabel = createLabel("Title:", "book_title_label");
    const titleValue = createValue(book.title, "book_title");
    const authorLabel = createLabel("Author:", "book_author_label");
    const authorValue = createValue(book.author, "book_author");
    const pagesLabel = createLabel("Pages:", "book_pages_label");
    const pagesValue = createValue(book.pages, "book_pages");
    const readLabel = createLabel("Read?", "book_read_label");
    const readValueElement = createValue(book.read, "book_read");
    const toggleButton = createToggleButton();

    cardContent.appendChild(titleLabel);
    cardContent.appendChild(titleValue);
    cardContent.appendChild(authorLabel);
    cardContent.appendChild(authorValue);
    cardContent.appendChild(pagesLabel);
    cardContent.appendChild(pagesValue);
    cardContent.appendChild(readLabel);
    cardContent.appendChild(readValueElement);
    cardContent.appendChild(toggleButton);

    card.appendChild(cardContent);
    bookDataContainer.appendChild(card);
  });
}

// Creamos un botón para cambiar el estado del libro (leído/no leído)

function createToggleButton() {
  const button = document.createElement("button");
  button.textContent = "Cambiar estado";
  button.className = "toggle-read-button";
  return button;
}

function createLabel(text, className) {
  const label = document.createElement("div");
  label.className = `label ${className}`;
  label.textContent = text;
  return label;
}

function createValue(text, className) {
  const value = document.createElement("div");
  value.className = className;
  value.textContent = text;
  return value;
}

// Agregamos que cuando se haga click en el botón de "cambiar estado" se cambie el valor de "book_read"
bookDataContainer.addEventListener("click", (event) => {
  if (event.target && event.target.classList.contains("toggle-read-button")) {
    const button = event.target;
    const card = button.closest(".card"); // Encuentra la tarjeta del libro a la que se refiere
    const readElement = card.querySelector(".book_read"); // Encuentra el elemento de leído/no leído
    const currentReadValue = readElement.textContent;

    // Cambia el valor "Leído" a "No Leído" o viceversa
    if (currentReadValue === "Yes") {
      readElement.textContent = "No";
    } else {
      readElement.textContent = "Yes";
    }
  }
});
