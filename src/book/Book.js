import React, { Component } from 'react';
import { normalizeText } from '../helpers/normalizeText'

class Book extends Component {

  shelfSelect = (book, optionShelf) => {
    if (book.shelf) {
      return book.shelf === optionShelf ? true : false;
    } else {
      return optionShelf === 'none' ? true : false;
    }
  }

  render () {
    const options = ['currentlyReading', 'wantToRead', 'read', 'none']
    const thumbnail = 'imageLinks' in this.props.book ? this.props.book.imageLinks.thumbnail : false;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
          <div className="book-shelf-changer">
          <select
            value={this.props.books.filter((book) => book.id === this.props.book.id).reduce((prev, book) => book.shelf, 'none')}
            onChange={(e) => this.props.updateShelf(this.props.book, e.target.value)} >
            <option value="move" disabled>Move to...</option>
            {
              options.map(shelf => (
                <option
                  key={shelf}
                  value={shelf}>
                    {normalizeText(shelf)}
                </option>
              ))
            }
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.id}</div>
        <div className="book-authors">
          {
            this.props.book.authors &&
              (this.props.book.authors.map(author => (
                <div key={author}>
                  {author}
                </div>
              ))
            )
          }
        </div>
      </div>
    )
  }
}

export default Book;