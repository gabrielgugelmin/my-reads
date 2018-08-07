import React, { Component } from 'react'
import Book from './Book'
import ShelfTitle from './ShelfTitle';

class BookShelf extends Component {
  render () {
    return (
      <div className="bookshelf">
        <ShelfTitle shelfTitle={this.props.shelfTitle} />
          <div className="bookshelf__grid">
            {
              this.props.books.filter(book => book.shelf === this.props.shelfTitle).map(book => (
                <Book
                  book={book}
                  books={this.props.books}
                  key={book.id}
                  updateShelf={this.props.updateShelf}
                />
              ))
            }
          </div>
      </div>
    )
  }
}

export default BookShelf