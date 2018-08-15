import React, { Component } from 'react';
import { Link }from 'react-router-dom';
import PropTypes from 'prop-types';
import { normalizeText, getExcerpt } from '../helpers/Helpers';
// https://www.npmjs.com/package/react-star-rating-component
import StarRatingComponent from 'react-star-rating-component';

class Book extends Component {
  handleChange = (book, shelf) => {
    // Muda o livro de prateleira
    this.props.updateShelf(book, shelf);

    // Mostra mensagem de feedback
    this.props.addNotification();
  }

  handleClick = (event, book) => {
    event.stopPropagation();
    this.props.triggerModal(book);
  }

  handleClickSelect(e) {
    e.stopPropagation()
  }

  render () {
    // Resumo do livro
    const description = this.props.book.description && (getExcerpt(this.props.book.description, 340));
    const descriptionExcerpt = this.props.book.description && (getExcerpt(this.props.book.description, 150));

    // Verifica se o book possui imagem
    const thumbnail = 'imageLinks' in this.props.book ? this.props.book.imageLinks.thumbnail : false;

    return (
      <div className="book" onClick={(event) => this.handleClick(event, this.props.book)}>
        <Link to={`/livro/${this.props.book.id}`}>
          <div className="book__container">
            <div className="book__figure">
              <div className="book__image" title={this.props.book.title} style={{backgroundImage: `url(${thumbnail})` }}></div>
            </div>
            <div className="book__text">
              <div className="book__shelf-changer">
                <span></span>
                <select
                  value={this.props.books.filter((book) => book.id === this.props.book.id).reduce((prev, book) => book.shelf, 'none')}
                  onChange={(event) => this.handleChange(this.props.book, event.target.value) } onClick={this.handleClickSelect} >
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
                    name="rating"
                    editing={false}
                    starCount={5}
                    value={this.props.book.averageRating}
                    emptyStarColor={"#8f8f8f"}
                  />
                ) : (
                  <div className="book__rating">Nota não disponível</div>
                )
              }
              <p className="book__description" title={description}>
                {descriptionExcerpt}
              </p>
            </div>
          </div>
        </Link>
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