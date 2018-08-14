import React from 'react';
import PropTypes from 'prop-types';

function Modal (props) {
  const CSSClasses = ['overlay'];
  console.log(props.book)
  if (props.show) {
    CSSClasses.push('overlay--open');
  }

  return (
    <div className={[...CSSClasses].join(' ')}>
      <div className="modal">
        <div className="modal__container">
          <header className="modal__header">
            <h3>{props.book.title}</h3>
          </header>
          <section className="modal__body">
            <p>{props.book.description}</p>
            <iframe frameborder="0" scrolling="no" src="https://books.google.com.br/books?id=OECC3GyCXe8C&lpg=PP1&dq=artificial%20intelligence&pg=PP1&output=embed" width="500" height="500"></iframe>
          </section>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  book: PropTypes.object,
}

export default Modal