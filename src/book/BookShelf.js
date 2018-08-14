import React, { Component } from 'react'
import PropTypes from "prop-types";
import Book from './Book'
import ShelfTitle from './ShelfTitle';

class BookShelf extends Component {
  render () {
    return (
      <div className="bookshelf">
        <ShelfTitle shelfTitle={this.props.shelfTitle} />
          <div className="bookshelf__grid">
            {
              // Separo os livros por prateleira
              this.props.books.filter(book => book.shelf === this.props.shelfTitle).map(book => (
                <Book
                  addNotification={this.props.addNotification}
                  book={book}
                  books={this.props.books}
                  key={book.id}
                  shelfs={this.props.shelfs}
                  triggerModal={this.props.triggerModal}
                  updateShelf={this.props.updateShelf}
                />
              ))
            }
          </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  addNotification: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  shelfs: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default BookShelf