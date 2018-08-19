import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import bookStore from "./stores/BookStore";

class BookList extends Component {
  render() {
    let books = [];
    const color = this.props.match.params.bookColor;

    if (!color) {
      books = bookStore.getFilteredBooks;
    } else {
      books = bookStore.getFilteredBooks.filter(book => book.color === color);
    }

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div className="books">
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        <BookTable books={books} />
      </div>
    );
  }
}

export default observer(BookList);
