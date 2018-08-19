import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  constructor() {
    this.books = [];
    this.loading = true;
    this.query = "";
    this.getAllBooks();
  }

  getAllBooks() {
    return instance
      .get("/api/books/")
      .then(res => res.data)
      .then(books => {
        this.books = books;
        this.loading = false;
      })
      .catch(err => console.error(err));
  }

  get getFilteredBooks() {
    const query = this.query.toLowerCase();
    return this.books.filter(book => book.title.toLowerCase().includes(query));
  }
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  getFilteredBooks: computed
});

export default new BookStore();
