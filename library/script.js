class book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    getDetails(){
        return `<h5 class="card-title">${this.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${this.author}€</h6>
        <p class="card-text">${this.isbn}</p>`
 
    }
}
class library{
    constructor() {
        this.books = [];
    };
    addbook(book) {
        this.books.push(book);
    }
    removebook(isbn){
        this.books.filter(book => book.isbn!== isbn);
    }
    findbook(isdn){
        this.books.find(book => book.isbn === isdn);
    }
    listbooks(){
        this.books.forEach(book => {
            console.log(book.getDetails());
        });
    }
}
const library = new library();
const book1 = new book('Book 1', 'Author 1', '1234567890');
const book2 = new book('Book 2', 'Author 2', '9876543210');
const book3 = new book('Book 3', 'Author 3', '1111111111');


library.addbook(book1);
library.addbook(book2);
library.addbook(book3);

library.removebook('1234567890');

library.findbook('1111111111');

library.listbooks();

