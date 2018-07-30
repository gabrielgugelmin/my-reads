import React, { Component } from 'react';
import { normalizeText } from './helpers/normalizeText';

class Book extends Component {
  render () {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(e) => this.props.updateShelf(this.props.book, e.target.value) }>
              <option value="move" disabled>Move to...</option>
              {
                this.props.shelfs.map(shelf => (
                  <option key={shelf} value={shelf}>{normalizeText(shelf)}</option>
                ))
              }
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">
          {
            this.props.book.authors.map(author => (
              <div key={author}>{author}</div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Book;