import React, { Component } from 'react'
import Book from './Book'
import ShelfTitle from './ShelfTitle';

class BookShelf extends Component {
  render () {
    return (
      <div className="bookshelf">
        <ShelfTitle shelfTitle={this.props.shelfTitle} />
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.filter(book => book.shelf === this.props.shelfTitle).map(book => (
                <Book key={book.id} book={book} updateShelf={this.props.updateShelf} />
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf