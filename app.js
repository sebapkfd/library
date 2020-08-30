class BookClass{
    constructor(title, author, nPages, status){
        this.title = title;
        this.author = author;
        this.nPages = nPages;
        this.status = status;
    }

    get info(){
        return (this.status)? (
            `${this.title} by ${this.author}, ${this.nPages} pages, already read`
        ):(
            `${this.title} by ${this.author}, ${this.nPages} pages, not read yet`)        
    }
}

let bookXd = new BookClass('xd', 'seba', 200, true);

class Interface{
    mainDiv = document.querySelector('.books');
    openForm = document.querySelector('#openForm')
    addButton = document.querySelector('#addBook');
    cancelButton = document.querySelector('#cancel');
    modal = document.querySelector('.modal');

    xd(){
        console.log('xd');
    }

    deleteDivBook(bookId){
        let bookToDelete = document.getElementById(bookId);
        this.mainDiv.removeChild(bookToDelete);
    }

    changeDivStatus(bookId){
        let bookToChange = JSON.parse(localStorage[bookId]);// its entering things from library class
        let divToChange = document.getElementById(bookId).firstChild;
        divToChange.textContent = info(bookToChange);
    }

    addDiv(bookElement){
        let bookDiv = document.createElement('div');
        bookDiv.className = "book-container";
    
        let contentDiv = document.createElement('div');
        contentDiv.className = "info-container";
        contentDiv.textContent = info(bookElement);
    
        bookDiv.setAttribute('id', `${bookElement.title}`)
        console.log(bookElement);
    
        let deleteBookButton = document.createElement('button');
        deleteBookButton.className = 'bookButton';
        deleteBookButton.innerHTML = 'Delete Book';
        deleteBookButton.addEventListener('click', () => {
            this.deleteBook(bookDiv.id);// Not defined here
            this.deleteDivBook(bookDiv.id);
        })
    
        let statusBookButton = document.createElement('button');
        statusBookButton.className = 'bookButton';
        statusBookButton.innerHTML = 'Read Book';
        statusBookButton.addEventListener('click', () => {
            this.changeStatus(bookDiv.id)//not defined here
            this.changeDivStatus(bookDiv.id);
        })
    
        this.mainDiv.appendChild(bookDiv);
        bookDiv.appendChild(contentDiv);
        bookDiv.appendChild(deleteBookButton);
        bookDiv.appendChild(statusBookButton);
    }

    submitForm(){
        let titleToAdd = document.getElementById('titleInput').value;
        let authorToAdd = document.getElementById('authorInput').value;
        let pagesToAdd = parseInt(document.getElementById('pagesInput').value);
        let statusToAdd = document.getElementById('statusInput').checked;
        if(titleToAdd != '' && authorToAdd != '' && typeof pagesToAdd == 'number'){
            console.log('added');
            this.modal.style.display = 'none';//
            return { titleToAdd, authorToAdd, pagesToAdd, statusToAdd};//
        }
        this.modal.style.display = 'none';
        return null
    }
}

let interface = new Interface();

class Library{
    myLibrary = [];
    interface = new Interface();// maybe its on the other way, a library inside a Interface

    saveData(){
        this.myLibrary.forEach( (book)=>{
            localStorage.setItem(`${book.title}`, JSON.stringify(book));
        })
    }

    addToLibrary(title, author, nPages, status){
        let bookToAdd = new Book(title, author, nPages, status);
        this.myLibrary.push(bookToAdd);
        this.saveData();
        return bookToAdd;
    }

    deleteBook(bookId){
        // deleteBookDiv(bookId);
        localStorage.removeItem(bookId);
        let index;
        this.myLibrary.forEach( (book)=>{
            if (book.title == bookId){
                index = this.myLibrary.indexOf(book);
            }
        })
        this.myLibrary.splice(index, 1)
        console.log(this.myLibrary);
        console.log(bookId);
    }

    changeStatus(bookId){
        let bookToChange = JSON.parse(localStorage[bookId]);
        bookToChange.status = !bookToChange.status;
        localStorage.setItem(bookId, JSON.stringify(bookToChange));
        console.log(bookToChange);
        // changeDivStatus(bookId, bookToChange)
    }

    render(){ //maybe it is inside interface
        Object.keys(localStorage).forEach(function(key){
            let bookToadd = JSON.parse(localStorage.getItem(key));
            this.addToLibrary(bookToadd.title, bookToadd.author, bookToadd.nPages, bookToadd.status);
         });
        console.log(this.myLibrary.length);
        this.myLibrary.forEach( (bookElement) => this.interface.addDiv(bookElement));
    }

}


let myLibrary = []; //lc
// Gc**
const mainDiv = document.querySelector('.books');
const openForm = document.querySelector('#openForm')
const addButton = document.querySelector('#addBook');
const cancelButton = document.querySelector('#cancel');
const modal = document.querySelector('.modal')

//maybe lc, insert on a main function?
if (localStorage.length == 0){
    addToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
    addToLibrary('The Dos', 'Dos', 100, false);
    addToLibrary('The Three', 'XDDD', 44, false);
    myLibrary.forEach( (bookElement) => addDiv(bookElement))
    saveData();
}else{
    myLibrary.length = 0;
    render();
}

//lc
function saveData(){
    myLibrary.forEach( (book)=>{
        localStorage.setItem(`${book.title}`, JSON.stringify(book));
    })
}
// basically a class**
function Book(title, author, nPages, status){
    this.title = title
    this.author = author
    this.nPages = nPages
    this.status = status
}

// book class method**
function info(book){
    return (book.status)? (
        `${book.title} by ${book.author}, ${book.nPages} pages, already read`
    ):(
        `${book.title} by ${book.author}, ${book.nPages} pages, not read yet`)
}

//lc method**
function addToLibrary(title, author, nPages, status){
    const bookToAdd = new Book(title, author, nPages, status);
    myLibrary.push(bookToAdd);
    saveData();
    return bookToAdd;
}

//lc method**
function deleteBook(bookId){
    deleteBookDiv(bookId);
    localStorage.removeItem(bookId);
    let index;
    myLibrary.forEach( (book)=>{
        if (book.title == bookId){
            index = myLibrary.indexOf(book);
        }
    })
    myLibrary.splice(index, 1)
    console.log(myLibrary);
    console.log(bookId);
}

//gc method**
function deleteBookDiv(bookId){
    let bookToDelete = document.getElementById(bookId);
    mainDiv.removeChild(bookToDelete);
}

//lc method**
function changeStatus(bookId){
    let bookToChange = JSON.parse(localStorage[bookId]);
    bookToChange.status = !bookToChange.status;
    localStorage.setItem(bookId, JSON.stringify(bookToChange));
    console.log(bookToChange);
    changeDivStatus(bookId, bookToChange)
}

//gc method**
function changeDivStatus(bookId, bookToChange){
    let divToChange = document.getElementById(bookId).firstChild;
    divToChange.textContent = info(bookToChange);
}

//gc method**
function addDiv(bookElement){
    let bookDiv = document.createElement('div');
    bookDiv.className = "book-container";

    let contentDiv = document.createElement('div');
    contentDiv.className = "info-container";
    contentDiv.textContent = info(bookElement);

    bookDiv.setAttribute('id', `${bookElement.title}`)
    console.log(bookElement);

    let deleteBookButton = document.createElement('button');
    deleteBookButton.className = 'bookButton';
    deleteBookButton.innerHTML = 'Delete Book';
    deleteBookButton.addEventListener('click', () => deleteBook(bookDiv.id))

    let statusBookButton = document.createElement('button');
    statusBookButton.className = 'bookButton';
    statusBookButton.innerHTML = 'Read Book';
    statusBookButton.addEventListener('click', () => changeStatus(bookDiv.id))

    mainDiv.appendChild(bookDiv);
    bookDiv.appendChild(contentDiv);
    bookDiv.appendChild(deleteBookButton);
    bookDiv.appendChild(statusBookButton);
}

//gc method **
function submitForm(){
    let titleToAdd = document.getElementById('titleInput').value;
    let authorToAdd = document.getElementById('authorInput').value;
    let pagesToAdd = parseInt(document.getElementById('pagesInput').value);
    let statusToAdd = document.getElementById('statusInput').checked;
    if(titleToAdd != '' && authorToAdd != '' && typeof pagesToAdd == 'number'){
        console.log('added');
        // addToLibrary(titleToAdd, authorToAdd, pagesToAdd, statusToAdd);
        modal.style.display = 'none';//
        return { titleToAdd, authorToAdd, pagesToAdd, statusToAdd};//
    }
    modal.style.display = 'none';
    return null;
}

//lc method
function render(){
    Object.keys(localStorage).forEach(function(key){
        let bookToadd = JSON.parse(localStorage.getItem(key));
        addToLibrary(bookToadd.title, bookToadd.author, bookToadd.nPages, bookToadd.status);
     });
    console.log(myLibrary.length);
    myLibrary.forEach( (bookElement) => addDiv(bookElement))
}
// lc method which acces to gc attributes
openForm.addEventListener('click', ()=>{
    modal.style.display = 'block';
    addButton.addEventListener('click', () =>{
        let bookToSubmit = submitForm();//
        if (bookToSubmit != null){//
            addToLibrary(bookToSubmit.titleToAdd, bookToSubmit.authorToAdd, bookToSubmit.pagesToAdd, bookToSubmit.statusToAdd);//
            location.reload();
        }
    });
    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none';
    })
})

/*
Empezar a trabajar los divs:
    Change the info to the form:
    Title: bla
    Autho: bla
    Pages: bla
    Status *This part with a diferent color depending of the status
*/

