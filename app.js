let myLibrary = [];
const mainDiv = document.querySelector('.books');
const addButton = document.querySelector('#addBook');

if (localStorage.length == 0) {
    // localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    // se guarda Mylibrary completo tmbn
    addToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
    addToLibrary('The Dos', 'Dos', 100, true);
    addToLibrary('the Three', 'XDDD', 44, false);
    myLibrary.forEach( (bookElement) => addDiv(bookElement))
    saveData();
}else{
    myLibrary.length = 0;
    render();
}

function saveData(){
    // localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    // Voy cambiarlo a guardar cada elemnto por separado para porbar render()
    // se guardan las cosas
    myLibrary.forEach( (book)=>{
        localStorage.setItem(`${book.title}`, JSON.stringify(book));
    })
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
    const bookToAdd = new Book(title, author, nPages, read);
    myLibrary.push(bookToAdd);
    saveData();
    return bookToAdd;
}

function addDiv(bookElement){
    let bookContent = document.createElement('div');
    bookContent.className = "book-container";
    bookContent.textContent = bookElement.title;
    mainDiv.appendChild(bookContent);
}

function submitForm(){
    let titleToAdd = document.getElementById('titleInput').value;
    let authorToAdd = document.getElementById('authorInput').value;
    let pagesToAdd = document.getElementById('pagesInput').value;
    let readToAdd = document.getElementById('readInput').value;
    addToLibrary(titleToAdd, authorToAdd, pagesToAdd, readToAdd);
}

function render(){
    Object.keys(localStorage).forEach(function(key){
        let bookToadd = JSON.parse(localStorage.getItem(key));
        addToLibrary(bookToadd.title, bookToadd.author, bookToadd.nPages, bookToadd.read);
        console.log(bookToadd)
     });
    console.log(myLibrary.length);
    myLibrary.forEach( (bookElement) => addDiv(bookElement))
}


addButton.addEventListener('click', submitForm);

/*
Empezar a trabajar los divs:
    Estilos
    Buttons divs books
    change read -> status
    it is saving strings
    it isnot saving true/false
    It is saving empty info

    https://draeramsey.github.io/library/
    https://dovimaj.github.io/my-book-shelf/
*/

