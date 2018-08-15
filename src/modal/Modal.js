import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../book/BooksAPI';

class Modal extends Component {
  state = {
    title: ''
  }
  componentWillMount () {
    if (this.props.book) {
      this.setState(this.props.book);
    } else {
      console.log(this.props.bookId);

      if (this.props.bookId) {
        BooksAPI.get(this.props.bookId).then((book) => {

          this.setState(book);
        });
      }
    }
  }

  render () {
    const CSSClasses = ['overlay'];

    if (this.props.show) {
      CSSClasses.push('overlay--open');
    }

    return (
      <div className={[...CSSClasses].join(' ')}>
        <div className="modal">
          <div className="modal__container">
            <header className="modal__header">
              <h3>{this.state.title}</h3>
            </header>
            <section className="modal__body">
              <p></p>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  book: PropTypes.object,
}

export default Modal