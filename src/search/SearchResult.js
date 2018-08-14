import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from '../book/Book';

class SearchResult extends Component {
  render () {
    return (
      <div className="bookshelf__grid">
        {
          this.props.booksSearch.length > 0 ? (
            this.props.booksSearch.map(book => (
              <Book
                book={book}
                books={this.props.books}
                key={book.id}
                updateShelf={this.props.updateShelf}
                addNotification={this.props.addNotification}
                shelfs={this.props.shelfs}
              />
            ))
          ) : (
            <p className="search__message">{this.props.searchMessage}</p>
          )
        }
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