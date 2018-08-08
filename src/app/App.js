import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from '../book/BooksAPI'
import Search from '../search/Search';
import ListBooks from '../book/ListBooks';
import '../styles/styles.scss'

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
        <div className="container">
          <Route exact path="/" render={() => (
            <ListBooks
              books={this.state.books}
              shelfs={shelfs}
              showSearchPage={this.showSearchPage}
              updateShelf={this.updateShelf}
            />
          )} />
          <Route path="/search" render={() => (
            <Search
              searchQuery={this.state.searchQuery}
              searchBooks={this.searchBooks}
              books={this.state.books}
              booksSearch={this.state.booksSearch}
              updateShelf={this.updateShelf}
              searchMessage={this.state.searchMessage}
            />
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp
