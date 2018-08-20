import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

class Modal extends Component {
  componentWillMount () {
    if (this.props.book) {
      this.setState({
        book: this.props.book
      });
    }
  }

  render () {
    const { book } = this.props;

    // Verifica se o livro tem imagem e troca o zoom da URL para pegar uma imagem de resolução maior
    // para não ficar pixelada ^_^
    const img = (book.hasOwnProperty('imageLinks')) ? book.imageLinks.thumbnail.replace('&zoom=1', '&zoom=2') : '';

    return (
      <div className="overlay overlay--open">
        <div className="modal">
          <div className="modal__container">
            <div className="modal__bg"></div>
            <header className="modal__header">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-4 col-md-4">
                    <div className="modal__img" style={{backgroundImage: `url('${img}')` }}></div>
                  </div>
                  <div className="col-xs-12 col-md-8">
                    <h3 className="modal__title">{book.title}</h3>

                    <div className="modal__info">
                      <ul>
                      {
                        (book.categories) && (book.categories.map(category => (
                            <li key={category}>{category.toUpperCase()}</li>
                        )))
                      }
                      </ul>
                      {
                        book.averageRating ? (
                          <div className="modal__rating">
                            <span>{book.averageRating}/5</span>
                            <StarRatingComponent
                              className="book__rating"
                              editing={false}
                              emptyStarColor={"#8f8f8f"}
                              name="rating"
                              starCount={5}
                              value={book.averageRating}
                            />
                          </div>
                        ) : (
                          <div className="book__rating">Nota não disponível</div>
                        )
                      }
                    </div>
                    <div className="modal__buttons">
                      <a href={book.previewLink} className="modal__button" target="_blank">preview</a>
                      <a href={book.previewLink} className="modal__button-icon" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M12,13A5,5 0 0,1 7,8H9A3,3 0 0,0 12,11A3,3 0 0,0 15,8H17A5,5 0 0,1 12,13M12,3A3,3 0 0,1 15,6H9A3,3 0 0,1 12,3M19,6H17A5,5 0 0,0 12,1A5,5 0 0,0 7,6H5C3.89,6 3,6.89 3,8V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V8C21,6.89 20.1,6 19,6Z" /></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={this.props.closeModal}
                className="modal__close"
                title="Fechar"
              ></button>
            </header>
            <section className="modal__body">
              <p>
                {book.description}
              </p>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  book: PropTypes.object,
  closeModal: PropTypes.func
}

export default Modal