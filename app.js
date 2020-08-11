let myLibrary = [];
let formIsOpen = false;

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
    let bookToAdd = new Book(title, author, nPages,read);
    myLibrary.push(bookToAdd);
}

addToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addToLibrary('The Dos', 'Dos', 100, true);
addToLibrary('the Three', 'XDDD', 44, false);

myLibrary.forEach( (bookElement) =>{
    let mainDiv = document.querySelector('.library-container');
    let bookContent = document.createElement('div');
    bookContent.className = "book-container";
    bookContent.textContent = bookElement.info();
    mainDiv.appendChild(bookContent);
})

let formButtons = document.querySelectorAll('.form-Button');
formButtons.forEach((formButton) =>{
    formButton.addEventListener('click', ()=>{
        let formDiv = document.querySelector('.modal');
        (formIsOpen) ? (
            formDiv.style.display = 'none',
            formIsOpen = false
            ) : (
            formDiv.style.display = 'block',
            formIsOpen = true
            )
    })
} )
