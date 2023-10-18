const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages}. ${this.read}`
    }
}

const showModalBtn = document.getElementById('showModalBtn');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const bookForm = document.getElementById('bookForm');
        const bookModal = document.getElementById('bookModal');
        const bookDataContainer = document.getElementById('cards_container');

        showModalBtn.addEventListener('click', () => {
            bookModal.showModal();
        });

        closeModalBtn.addEventListener('click', () => {
            bookModal.close();
        });

        bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
        
            const bookName = document.getElementById('bookName').value;
            const bookAuthor = document.getElementById('bookAuthor').value;
            const bookPages = document.getElementById('bookPages').value;
            const readValue = document.getElementById('bookRead').checked ? 'Yes' : 'No';
        
            const card = document.createElement('div');
            card.className = 'card';
        
            const cardContent = document.createElement('div');
            cardContent.className = 'card_content';
        
            const titleLabel = createLabel('Title:', 'book_title_label');
            const titleValue = createValue(bookName, 'book_title');
            const authorLabel = createLabel('Author:', 'book_author_label');
            const authorValue = createValue(bookAuthor, 'book_author');
            const pagesLabel = createLabel('Pages:', 'book_pages_label');
            const pagesValue = createValue(bookPages, 'book_pages');
            const readLabel = createLabel('Read?', 'book_read_label');
            const readValueElement = createValue(readValue, 'book_read');
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
        
            bookModal.close();
        });

        function createToggleButton() {
            const button = document.createElement('button');
            button.textContent = 'Cambiar estado';
            button.className = 'toggle-read-button';
            return button;
        }
        
        function createLabel(text, className) {
            const label = document.createElement('div');
            label.className = `label ${className}`;
            label.textContent = text;
            return label;
        }
        
        function createValue(text, className) {
            const value = document.createElement('div');
            value.className = className;
            value.textContent = text;
            return value;
        }

// Agrega un evento de clic a un elemento padre (por ejemplo, 'bookDataContainer') y delega el evento
bookDataContainer.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('toggle-read-button')) {
        const button = event.target;
        const card = button.closest('.card'); // Encuentra la tarjeta del libro
        const readElement = card.querySelector('.book_read'); // Encuentra el elemento de lectura
        const currentReadValue = readElement.textContent;

        // Cambia el valor "Leído" a "No Leído" o viceversa
        if (currentReadValue === 'Yes') {
            readElement.textContent = 'No';
        } else {
            readElement.textContent = 'Yes';
        }
    }
});