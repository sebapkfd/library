let myLibrary = [];
const mainDiv = document.querySelector('.books');
const addButton = document.querySelector('#addBook');

if (localStorage.length == 0) {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}else{

}

function saveData(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

function loadData(){
    if (localStorage.length == 0) {
        console.log('localStorage empty');
    }else{
        myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
    }
}

function Book(title, author, nPages, read){
    this.title = title
    this.author = author
    this.nPages = nPages
    this.read = read
}

Book.prototype.info = function() {
    return (this.read)? (
        `${this.title} by ${this.author}, ${this.nPages} pages, already read`
    ):(
        `${this.title} by ${this.author}, ${this.nPages} pages, not read yet`)
}

function addToLibrary(title, author, nPages, read){
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
    let titleToAdd = document.getElementById('titleInput').value;
    let authorToAdd = document.getElementById('authorInput').value;
    let pagesToAdd = document.getElementById('pagesInput').value;
    let readToAdd = document.getElementById('readInput').value;
    let bookAdded = addToLibrary(titleToAdd, authorToAdd, pagesToAdd, readToAdd);
    addDiv(bookAdded);
    saveData();
    alert(bookAdded.info())
}


addToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addToLibrary('The Dos', 'Dos', 100, true);
addToLibrary('the Three', 'XDDD', 44, false);
myLibrary.forEach( (bookElement) => addDiv(bookElement))

addButton.addEventListener('click', submitForm);

/*
Empezar a trabajar los divs:
    Estilos
    Buttons divs books
    localstorage
    change read -> status
    Read/status is not using boolean
    https://draeramsey.github.io/library/
    https://dovimaj.github.io/my-book-shelf/
*/

