import React, { Component } from 'react';

const options = ['currentlyReading', 'wantToRead', 'read', 'none']

class Book extends Component {

  handleSubmit = (book, shelf) => {
    console.log(shelf)
    if (this.props.updateShelf)
      this.props.updateShelf(book, shelf)
  }

  render () {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(e) => this.handleSubmit(this.props.book, e.target.value) }>
              <option value="move" selected disabled>Move to...</option>
              {
                options.map(shelf => (
                  <option key={shelf} value={shelf}>{shelf}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.shelf}</div>
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