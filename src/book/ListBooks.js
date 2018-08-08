import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf';

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {
              this.props.shelfs.map((shelfTitle) => (
                <BookShelf
                  books={this.props.books}
                  key={shelfTitle}
                  shelfTitle={shelfTitle}
                  updateShelf={this.props.updateShelf}
                />
              ))
            }
            {/* <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {

                 this.props.books.map(book => (
                    <Book key={book.id} book={book} updateShelf={this.props.updateShelf} />
                  ))
                }
                </ol>
              </div>
            </div> */}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
