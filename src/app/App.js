import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from '../book/BooksAPI';
import ListBooks from '../book/ListBooks';
import Header from '../header/Header';
import '../styles/styles.scss';
import SearchResult from '../search/SearchResult';
import Modal from '../modal/Modal';
import ReactNotification from "react-notifications-component";

class BooksApp extends React.Component {
  state = {
    // Usado para montar o modal
    bookModal: null,
    // Armazena os livros do usuário
    books: [],
    // Armazena os livros que são retornados pela busca (fn: searchBooks)
    booksSearch: [],
    // Valor do input de busca
    searchQuery: '',
    // Mensagem que será exibida na tela de busca
    searchMessage: 'Os resultados da pesquisa serão exibidos aqui',
    // Exibe modal
    showModal: false,
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

  // Atualiza o Book do Modal
  triggerModal = (book) => {
    this.setState({
      bookModal: book,
      showModal: true
    });
  }

  componentDidMount() {
    // Busca todos os livros do usuário
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      });
    });
  }

  // Notificação para feedback ao usuário
  addNotification = () => {
    this.notificationDOMRef.addNotification({
      title: "",
      message: "Livro adicionado à prateleira.",
      type: "default",
      insert: "bottom",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2250 },
      dismissable: { click: true },
      slidingEnter: {
        duration: 200
      },
      slidingExit: {
        duration: 200
      }
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
        <main className="main">
          <div className="container">
            <Route path="/" render={() => (
              <ListBooks
                books={this.state.books}
                shelfs={shelfs}
                updateShelf={this.updateShelf}
                addNotification={this.addNotification}
                triggerModal={this.triggerModal}
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
                  addNotification={this.addNotification}
                />
              </div>
            )}/>
          </div>
          <ReactNotification ref={input => this.notificationDOMRef = input} />
        </main>
        <Route 
          path="/livro/:id"
          render={(props) => (
            <Modal
              book={this.state.bookModal}
              // show={this.state.showModal}
              show="true"
              bookId={props.match.params.id}
            />
          )}
        />
        {/* {
          (this.state.showModal) && (
            <Modal
              book={this.state.bookModal}
              show={this.state.showModal}
            />
          )
        } */}
      </div>
    )
  }
}

export default BooksApp
