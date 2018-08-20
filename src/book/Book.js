import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { normalizeText, getExcerpt } from '../helpers/Helpers';
// https://www.npmjs.com/package/react-star-rating-component
import StarRatingComponent from 'react-star-rating-component';
import Modal from '../modal/Modal'

class Book extends Component {
  state = {
    showModal: false
  }

  handleChange = (event, book, shelf) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    // Muda o livro de prateleira
    this.props.updateShelf(book, shelf);

    // Mostra mensagem de feedback
    this.props.addNotification();
  }

  openModal = () => {
    this.setState({showModal: true});
  }

  closeModal = () => {
    this.setState({showModal: false});
  }

  handleClickSelect(event) {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  render () {
    const { book } = this.props;

    // Resumo do livro
    const description = book.description && (getExcerpt(book.description, 340));
    const descriptionExcerpt = book.description && (getExcerpt(book.description, 150));

    // Verifica se o book possui imagem
    const thumbnail = (book.hasOwnProperty('imageLinks')) ? book.imageLinks.thumbnail.replace('&zoom=1', '&zoom=2') : '';

    return (
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
                onChange={(event) => this.handleChange(event, book, event.target.value)}
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
            <div className="book__title" title={book.title}>{book.title}</div>
            <div className="book__authors">
              {
                book.authors && (
                  <div>
                    De 
                    {
                      book.authors.map((author, index) => (
                        `${(index > 0) ? ' e ' : '' } ${author}`
                      )
                    )}
                  </div>
                )
              }
            </div>
            {
              book.averageRating ? (
                <StarRatingComponent
                  className="book__rating"
                  editing={false}
                  emptyStarColor={"#8f8f8f"}
                  name="rating"
                  starCount={5}
                  value={book.averageRating}
                />
              ) : (
                <div className="book__rating">Nota não disponível</div>
              )
            }
            <p className="book__description" title={description}>
              {descriptionExcerpt}
            </p>

            <footer className="book__footer">
              <button
                className="book__link"
                onClick={this.openModal} >
                ver mais
              </button>
            </footer>
          </div>
        </div>
        {this.state.showModal &&
          <Modal
            closeModal={this.closeModal}
            book={book}
          />
        }
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