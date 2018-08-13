import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizeText } from '../helpers/normalizeText';

class Book extends Component {

  render () {
    // Verifica se o book possui imagem
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
                  this.props.shelfs.map(shelf => (
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

Book.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired
}

export default Book;