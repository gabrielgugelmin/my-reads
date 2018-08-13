import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../book/BooksAPI';
import Search from '../search/Search';
import ListBooks from '../book/ListBooks';
import Header from '../header/Header';
import '../styles/styles.scss';
import SearchBar from '../search/SearchBar';
import SearchResult from '../search/SearchResult';

class BooksApp extends React.Component {
  state = {
    // Armazena os livros do usuário
    books: [],
    // Armazena os livros que são retornados pela busca (fn: searchBooks)
    booksSearch: [],
    // Valor do input de busca
    searchQuery: '',
    // Mensagem que será exibida na tela de busca
    searchMessage: 'Os resultados da pesquisa serão exibidos aqui'
  }

  // Muda o livro de prateleira
  updateShelf = (book, shelf) => {
    book.shelf = shelf;

    this.setState((state) => ({
      books: [...[...state.books].filter(b => b.id !== book.id), book]
    }));

    BooksAPI.update(book, shelf);
  }

  // Busca os livros de acordo com o valor do input
  searchBooks = (event) => {
    this.setState({ searchQuery: event.target.value });

    // Só consulta a API caso o input não esteja vazio
    if (event.target.value.length > 0) {
      BooksAPI.search(event.target.value).then((booksSearch) => {
        let result = booksSearch.length > 0 ? booksSearch : [];

        this.setState({
          booksSearch: result
        });
      });
    } else {
      // Caso contrário zera o array para não exibir livros incorretos
      // Atualiza a mensagem para melhor feedback
      this.setState({
        booksSearch: [],
        searchMessage: 'Nenhum resultado encontrado'
      });
    }
  }

  componentDidMount() {
    // Busca todos os livros do usuário
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      });
    });
  }

  render() {
    // Prateleiras disponíveis
    const shelfs = ['currentlyReading', 'wantToRead', 'read', 'none']

    return (
      <div className="app">
        <Header 
          searchQuery={this.state.searchQuery}
          searchBooks={this.searchBooks}
        />
        <div className="container">
          <Route exact path="/" render={() => (
            <ListBooks
              books={this.state.books}
              shelfs={shelfs}
              updateShelf={this.updateShelf}
            />
          )} />
          <Route path="/search" render={() => (
            <div className="search-books">
              <SearchResult
                books={this.state.books}
                booksSearch={this.state.booksSearch}
                searchMessage={this.state.searchMessage}
                shelfs={shelfs}
                updateShelf={this.updateShelf}
              />
            </div>
          )}/>
        </div>
      </div>
    )
  }
}

export default BooksApp
