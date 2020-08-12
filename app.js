let myLibrary = [];
let formIsOpen = false;
const formButtons = document.querySelectorAll('.form-button');
const mainDiv = document.querySelector('.library-container');
const formDiv = document.querySelector('.modal');
const addBookForm = document.querySelector('.submit-button');

function Book(title, author, nPages, read){
    this.title = title
    this.author = author
    this.nPages = nPages
    this.read = read
}

Book.prototype.info = function() {
    return (this.read)? `${this.title} by ${this.author}, ${this.nPages} pages, already read`: `${this.title} by ${this.author}, ${this.nPages} pages, not read yet`
}

function addToLibrary(title, author, nPages, read) {
    const bookToAdd = new Book(title, author, nPages,read);
    myLibrary.push(bookToAdd);
    return bookToAdd;
}

function addDiv(bookElement){
    let bookContent = document.createElement('div');
    bookContent.className = "book-container";
    bookContent.textContent = bookElement.info();
    mainDiv.appendChild(bookContent);
}

function submitForm(){
    let titleToAdd = document.getElementById('bookTitle').value;
    let authorToAdd = document.getElementById('bookAuthor').value;
    let pagesToAdd = document.getElementById('bookPages').value;
    let readToAdd = document.getElementById('bookRead').value;
    let bookAdded = addToLibrary(titleToAdd, authorToAdd, pagesToAdd, readToAdd);
    addDiv(bookAdded);
    alert(bookAdded.info())
}


formButtons.forEach((formButton) =>{
    formButton.addEventListener('click', ()=>{
        (formIsOpen) ? (
            formDiv.style.display = 'none',
            formIsOpen = false
            ) : (
            formDiv.style.display = 'block',
            formIsOpen = true,
            addBookForm.addEventListener('click', submitForm)
            )
    })
})

addToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addToLibrary('The Dos', 'Dos', 100, true);
addToLibrary('the Three', 'XDDD', 44, false);
myLibrary.forEach( (bookElement) => addDiv(bookElement))

/*
Empezar a trabajar los divs:
    Estilos
    Buttons
Resolver el tema que se recarga la pagina -> localstorage
*/

