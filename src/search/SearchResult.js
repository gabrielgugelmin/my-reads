import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class SearchResult extends Component {

  addNotification = () => {
    this.notificationDOMRef.addNotification({
      title: "",
      message: "Livro adicionado.",
      type: "default",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2750 },
      dismissable: { click: true }
    });
  }

  render () {
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {
            this.props.booksSearch.length > 0 ? (
              this.props.booksSearch.map(book => (
                <Book
                  book={book}
                  books={this.props.books}
                  key={book.id}
                  updateShelf={this.props.updateShelf}
                  shelfs={this.props.shelfs}
                />
              ))
            ) : (
              <p className="search__message">{this.props.searchMessage}</p>
            )
          }
        </ol>
        <ReactNotification ref={input => this.notificationDOMRef = input} />
        <button onClick={this.addNotification} className="btn btn-primary">
          Add Awesome Notification
        </button>
      </div>
    )
  }
}

SearchResult.propTypes = {
	books: PropTypes.array.isRequired,
	booksSearch: PropTypes.array.isRequired,
	searchMessage: PropTypes.string.isRequired,
	shelfs: PropTypes.array.isRequired,
	updateShelf: PropTypes.func.isRequired,
}

export default SearchResult