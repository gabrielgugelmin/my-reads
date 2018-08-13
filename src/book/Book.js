import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizeText, getExcerpt } from '../helpers/Helpers';

class Book extends Component {

  render () {
    // Verifica se o book possui imagem
    const thumbnail = 'imageLinks' in this.props.book ? this.props.book.imageLinks.thumbnail : false;

    return (
      <div className="book">
        <div className="book__container">
          <div className="book__figure">
            <div className="book__image" style={{backgroundImage: `url(${thumbnail})` }}></div>
          </div>
          <div className="book__text">
            <div className="book__shelf-changer">
              <span></span>
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
            <div className="book__title">{this.props.book.title}</div>
            <div className="book__authors">
              {
                this.props.book.authors && (
                  <div>
                    De 
                    {
                      this.props.book.authors.map((author, index) => (
                        `${(index > 0) ? ' e ' : '' } ${author}`
                      )
                    )}
                  </div>
                )
              }
            </div>
            <div className="book__description">
              {
               this.props.book.description && (getExcerpt(this.props.book.description, 42))
              }
            </div>
          </div>
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