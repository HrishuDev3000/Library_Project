console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");


let submit = document.querySelector("#submit");
let form = document.querySelector("#bookForm");

class Book {
    constructor( id, title, author, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.count = 0;
        this.books = [];
    }

    markedRead(checkbox, id) {
        for (let book of this.books) {
            if (book.id === id) {
                book.read = true;
                checkbox.checked = true;
                checkbox.disabled = true;
                break;
            }
        }
    }

    addBook(title, author, read) {
        const newBook = new Book(this.count, title, author, read);
        this.books.push(newBook);

        // Select the table body
        let table = document.querySelector("#list tbody");

        // Create a new row
        let newRow = table.insertRow();

        // Add title cell
        let titleCell = newRow.insertCell(0);
        titleCell.textContent = title;

        // Add author cell
        let authorCell = newRow.insertCell(1);
        authorCell.textContent = author;

        // Add read cell with checkbox
        let readCell = newRow.insertCell(2);
        let readCheckbox = document.createElement('input');
        readCheckbox.type = 'checkbox';
        readCheckbox.checked = read;
        readCheckbox.id = `book-${this.count}`;
        readCheckbox.addEventListener('change', () => {
            this.markedRead(readCheckbox, newBook.id);
        });
        if (read) {
            readCheckbox.disabled = true;
        }
        readCell.appendChild(readCheckbox);

        this.count++;
    }
}


const myLibrary = new Library();


form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    // Get input values
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const readInput = document.getElementById("bookCheck");

    const title = titleInput.value;
    const author = authorInput.value;
    const read = readInput.checked;


    myLibrary.addBook(title, author, read);


    titleInput.value = "";
    authorInput.value = "";
    readInput.checked = false;
});