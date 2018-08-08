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
        <div className="book__top">
          <div className="book__image" style={{backgroundImage: `url(${thumbnail})` }}>
            <div className="book__shelf-changer">
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
        </div>
        <div className="book__title">{this.props.book.title}</div>
        <div className="book__authors">
          {
            this.props.book.authors &&
              (this.props.book.authors.map(author => (
                <div key={author} className="book__authors-item">
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