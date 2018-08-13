import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {
              this.props.shelfs.map((shelfTitle) => (
                <BookShelf
                  books={this.props.books}
                  key={shelfTitle}
                  shelfTitle={shelfTitle}
                  shelfs={this.props.shelfs}
                  updateShelf={this.props.updateShelf}
                />
              ))
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  shelfs: PropTypes.array.isRequired,
  updateShelf: PropTypes.func.isRequired,
}

export default ListBooks
