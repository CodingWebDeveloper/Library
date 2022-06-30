let myLibrary = [];
let btn = document.getElementById('addBook'); 
let collection = document.getElementById('collection');
let infoUnreadBooks = document.getElementById('b-unread');
let infoReadBooks = document.getElementById('b-read');
let infoAllBooks = document.getElementById('books');


function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function(){
         return `${this.title} by ${this.author}, ${this.pages} pages, ${isRead ? 'is read' : 'not read yet'}`;
    }
}

function addBookToLibrary(){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let isRead = document.getElementById('isRead').checked;

    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
}

btn.addEventListener('click',e=>{
    addBookToLibrary();
    refreshCollection();
    changeBookValuesInfo();
});

function refreshCollection(){
    collection.innerHTML = "";
    for(var i = 0; i < myLibrary.length; i++){
        let bookEl = document.createElement('div');
        let bookBtnIsRead = document.createElement('button');
        bookBtnIsRead.classList.add('btn');
        bookEl.classList.add('book');

        if (myLibrary[i].isRead){
            bookBtnIsRead.id = "true" + "_" + i;
            bookBtnIsRead.textContent = "READ";

        } else{
            bookBtnIsRead.id = "false" + "_" + i;
            bookBtnIsRead.textContent = "NOT READ";
        }

        bookBtnIsRead.addEventListener('click', e =>{
            let target = e.target;
            let [k,j] = target.id.split('_');
            if (k === "true"){
                changeBookStatus(j);
                target.id = "false"+ "_" + j;
                target.textContent = "NOT READ";

            } else{
                changeBookStatus(j);
                target.id = "true"+ "_" + j;
                target.textContent = "READ";
            }
        })
        
        bookEl.innerHTML = `
        <h3>${myLibrary[i].title}</h3>
        <h3>${myLibrary[i].author}</h3>
        <h3>${myLibrary[i].pages}</h3>
        `;
        bookEl.appendChild(bookBtnIsRead);
        collection.appendChild(bookEl);
    }
}

function changeBookStatus(idx){
    myLibrary[idx].isRead = !myLibrary[idx].isRead;
    changeBookValuesInfo();
}

function changeBookValuesInfo(){
    let unreadBooksCount = myLibrary.filter(e=> e.isRead == false).length;
    let readBooksCount = myLibrary.filter(e=> e.isRead == true).length;
    let booksCount = myLibrary.length;
    infoUnreadBooks.textContent = unreadBooksCount;
    infoReadBooks.textContent = readBooksCount;
    infoAllBooks.textContent = booksCount;
}