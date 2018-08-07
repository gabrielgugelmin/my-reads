import React from 'react'
import * as BooksAPI from '../book/BooksAPI'
import '../styles/styles.scss'
import Book from '../book/Book';
import ListBooks from '../book/ListBooks';

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
    booksSearch: [],
    searchQuery: '',
    searchMessage: 'Os resultados da pesquisa serão exibidos aqui'
  }

  updateShelf = (book, shelf) => {
    book.shelf = shelf;

    this.setState((state) => ({
      books: [...[...state.books].filter(b => b.id !== book.id), book]
    }));

    BooksAPI.update(book, shelf);
  }

  showSearchPage = () => {
    this.setState({
      showSearchPage: !this.state.showSearchPage
    });
  }

  searchBooks = (event) => {
    this.setState({ searchQuery: event.target.value });

    if (event.target.value.length > 0) {
      BooksAPI.search(event.target.value).then((booksSearch) => {
        let result = booksSearch.length > 0 ? booksSearch : [];

        this.setState({
          booksSearch: result
        });
      });
    } else {
      this.setState({
        booksSearch: [],
        searchMessage: 'Nenhum resultado encontrado'
      });
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      });
    });
  }

  render() {
    const shelfs = ['currentlyReading', 'wantToRead', 'read', 'none']

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.showSearchPage()}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input
                  onChange={this.searchBooks}
                  placeholder="Search by title or author"
                  type="text"
                  value={this.state.searchQuery}
                />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.booksSearch.length > 0 ? (
                    this.state.booksSearch.map(book => (
                      <Book
                        book={book}
                        books={this.state.books}
                        key={book.id}
                        updateShelf={this.updateShelf}
                      />
                    ))
                  ) : (
                    this.state.searchMessage
                  )
                }
              </ol>
            </div>
          </div>
        ) : (
          <div className="container">
            <ListBooks
              books={this.state.books}
              shelfs={shelfs}
              showSearchPage={this.showSearchPage}
              updateShelf={this.updateShelf}
            />
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
