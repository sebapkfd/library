let myLibrary = [];
const mainDiv = document.querySelector('.books');
const addButton = document.querySelector('#addBook');

if (localStorage.length == 0){
    addToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
    addToLibrary('The Dos', 'Dos', 100, true);
    addToLibrary('The Three', 'XDDD', 44, false);
    myLibrary.forEach( (bookElement) => addDiv(bookElement))
    saveData();
}else{
    myLibrary.length = 0;
    render();
}

function saveData(){
    myLibrary.forEach( (book)=>{
        localStorage.setItem(`${book.title}`, JSON.stringify(book));
    })
}

function Book(title, author, nPages, status){
    this.title = title
    this.author = author
    this.nPages = nPages
    this.status = status
}

Book.prototype.info = function() {
    return (this.status)? (
        `${this.title} by ${this.author}, ${this.nPages} pages, already read`
    ):(
        `${this.title} by ${this.author}, ${this.nPages} pages, not read yet`)
}

function addToLibrary(title, author, nPages, status){
    const bookToAdd = new Book(title, author, nPages, status);
    myLibrary.push(bookToAdd);
    saveData();
    return bookToAdd;
}

function addDiv(bookElement){
    let bookContent = document.createElement('div');
    bookContent.className = "book-container";
    bookContent.textContent = bookElement.title;
    console.log(bookElement);
    mainDiv.appendChild(bookContent);
}

function submitForm(){
    let titleToAdd = document.getElementById('titleInput').value;
    let authorToAdd = document.getElementById('authorInput').value;
    let pagesToAdd = parseInt(document.getElementById('pagesInput').value);
    let statusToAdd = document.getElementById('statusInput').checked;
    if(titleToAdd != '' && authorToAdd != '' && typeof pagesToAdd != 'number'){
        addToLibrary(titleToAdd, authorToAdd, pagesToAdd, statusToAdd);
    }
}

function render(){
    Object.keys(localStorage).forEach(function(key){
        let bookToadd = JSON.parse(localStorage.getItem(key));
        addToLibrary(bookToadd.title, bookToadd.author, bookToadd.nPages, bookToadd.status);
     });
    console.log(myLibrary.length);
    myLibrary.forEach( (bookElement) => addDiv(bookElement))
}


addButton.addEventListener('click', submitForm);

/*
Empezar a trabajar los divs:
    Estilos
    Buttons divs books
    It is saving empty info

    https://draeramsey.github.io/library/
    https://dovimaj.github.io/my-book-shelf/
*/

