import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizeText, getExcerpt } from '../helpers/Helpers';
// https://www.npmjs.com/package/react-star-rating-component
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom'

class Book extends Component {
  handleChange = (event, book, shelf) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    // Muda o livro de prateleira
    this.props.updateShelf(book, shelf);

    // Mostra mensagem de feedback
    this.props.addNotification();
  }

  handleClick = (book) => {
    this.props.handleToggleModal(book);
  }

  handleClickSelect(event) {
    console.log('OPAOAPAOPAOPAOAP')
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  render () {
    const { book } = this.props;

    // Resumo do livro
    const description = this.props.book.description && (getExcerpt(this.props.book.description, 340));
    const descriptionExcerpt = this.props.book.description && (getExcerpt(this.props.book.description, 150));

    // Verifica se o book possui imagem
    const thumbnail = (this.props.book.hasOwnProperty('imageLinks')) ? this.props.book.imageLinks.thumbnail.replace('&zoom=1', '&zoom=2') : '';

    return (
      // <div className="book" onClick={(event) => this.handleClick(event, this.props.book)}>
      <div className="book">        
        <div className="book__container">
          <div className="book__figure">
            <div className="book__image" title={this.props.book.title} style={{backgroundImage: `url(${thumbnail})` }}></div>
          </div>
          <div className="book__text">
            <div className="book__shelf-changer">
              <span></span>
              <select
                value={this.props.books.filter((book) => book.id === this.props.book.id).reduce((prev, book) => book.shelf, 'none')}
                onChange={(event) => this.handleChange(event, this.props.book, event.target.value)}
                onClick={(event) => this.handleClickSelect(event)} >
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
            <div className="book__title" title={this.props.book.title}>{this.props.book.title}</div>
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
            {
              this.props.book.averageRating ? (
                <StarRatingComponent
                  className="book__rating"
                  editing={false}
                  emptyStarColor={"#8f8f8f"}
                  name="rating"
                  starCount={5}
                  value={this.props.book.averageRating}
                />
              ) : (
                <div className="book__rating">Nota não disponível</div>
              )
            }
            <p className="book__description" title={description}>
              {descriptionExcerpt}
            </p>

            <footer className="book__footer">
              <Link
                to={`/livro/${this.props.book.id}`}
                onClick={() => this.handleClick(this.props.book)}
                className="book__link"
              >ver mais</Link>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
}

export default Book;