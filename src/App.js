import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  }
  

  updateShelf = (book, shelf) => {
    console.log(shelf);
    book.shelf = shelf;

    /* this.setState({ 
      books: [...currentBooks, book] 
    }); */

    this.setState((state) => ({
      books: [...[...state.books].filter(b => b.id !== book.id), book]
    }));
    
    BooksAPI.update(book, shelf)
  }
  

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ 
        books
      })
    })    
  }

  render() {
    // const shelfs = [...new Set(this.state.books.map(book => book.shelf))]
    const shelfs = ['currentlyReading', 'wantToRead', 'read', 'none']
    
    return (
      <div className="app">
        {
          <ListBooks books={this.state.books} shelfs={shelfs} updateShelf={this.updateShelf} />
        }
      </div>
    )
  }
}

export default BooksApp
