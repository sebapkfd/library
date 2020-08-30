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

class Library{
    myLibrary = [];

    saveData(){
        this.myLibrary.forEach( (book)=>{
            localStorage.setItem(`${book.title}`, JSON.stringify(book));
        })
    }

    addToLibrary(title, author, nPages, status){
        let bookToAdd = new BookClass(title, author, nPages, status);
        this.myLibrary.push(bookToAdd);
        this.saveData();
        return bookToAdd;
    }

    deleteBook(bookId){
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
    }

}

class Interface{
    mainDiv = document.querySelector('.books');
    openForm = document.querySelector('#openForm')
    addButton = document.querySelector('#addBook');
    cancelButton = document.querySelector('#cancel');
    modal = document.querySelector('.modal');
    library = new Library();

    xd(){
        console.log('xd');
    }

    deleteDivBook(bookId){
        let bookToDelete = document.getElementById(bookId);
        this.mainDiv.removeChild(bookToDelete);
    }

    changeDivStatus(bookId){
        let data = JSON.parse(localStorage[bookId]);
        let bookToChange = new BookClass(data.title, data.author, data.nPages, data.status)
        let divToChange = document.getElementById(bookId).firstChild;
        divToChange.textContent = bookToChange.info;
    }

    addDiv(bookElement){
        let bookDiv = document.createElement('div');
        bookDiv.className = "book-container";
    
        let contentDiv = document.createElement('div');
        contentDiv.className = "info-container";
        contentDiv.textContent = bookElement.info;
    
        bookDiv.setAttribute('id', `${bookElement.title}`)
        console.log(bookElement);
    
        let deleteBookButton = document.createElement('button');
        deleteBookButton.className = 'bookButton';
        deleteBookButton.innerHTML = 'Delete Book';
        deleteBookButton.addEventListener('click', () => {
            this.library.deleteBook(bookDiv.id);
            this.deleteDivBook(bookDiv.id);
        })
    
        let statusBookButton = document.createElement('button');
        statusBookButton.className = 'bookButton';
        statusBookButton.innerHTML = 'Read Book';
        statusBookButton.addEventListener('click', () => {
            this.library.changeStatus(bookDiv.id)
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
            this.modal.style.display = 'none';
            return { titleToAdd, authorToAdd, pagesToAdd, statusToAdd};
        }
        this.modal.style.display = 'none';
        return null
    }

    start(){//
        this.openForm.addEventListener('click', ()=>{
            this.modal.style.display = 'block';
            this.addButton.addEventListener('click', () =>{
                let bookToSubmit = this.submitForm();
                if (bookToSubmit != null){
                    this.library.addToLibrary(bookToSubmit.titleToAdd, bookToSubmit.authorToAdd, bookToSubmit.pagesToAdd, bookToSubmit.statusToAdd);//
                    location.reload();
                }
            });
            this.cancelButton.addEventListener('click', () => {
                this.modal.style.display = 'none';
            })
        })  
    }
}

let interface = new Interface();



function render(obj){
    Object.keys(localStorage).forEach(function(key){
        let bookToadd = JSON.parse(localStorage.getItem(key));
        obj.library.addToLibrary(bookToadd.title, bookToadd.author, bookToadd.nPages, bookToadd.status);
     });
    console.log(obj.library.myLibrary.length);
    obj.library.myLibrary.forEach( (bookElement) => obj.addDiv(bookElement));
}

if (localStorage.length == 0){
    interface.library.addToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
    interface.library.addToLibrary('The Dos', 'Dos', 100, false);
    interface.library.addToLibrary('The Three', 'XDDD', 44, false);
    interface.library.myLibrary.forEach( (bookElement) => interface.addDiv(bookElement))
    interface.library.saveData();
}else{
    interface.library.myLibrary.length = 0;
    render(interface);
}

interface.start();

/*
Empezar a trabajar los divs:
    Change the info to the form:
    Title: bla
    Autho: bla
    Pages: bla
    Status *This part with a diferent color depending of the status
*/

