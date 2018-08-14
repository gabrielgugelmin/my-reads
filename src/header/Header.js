import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import ImgLogo from '../img/myreads-logo.png';
import SearchBar from '../search/SearchBar';

class Header extends Component {
  state = {
    
  }

  render () {
    return (
      <header className="header">
        <div className="container">
          <img src={ImgLogo} alt="My Reads" />

          <Route path="/search" render={() => (
            <SearchBar
              searchQuery={this.props.searchQuery}
              searchBooks={this.props.searchBooks}
            />
          )} />

          <div className="header__action">
            <Route path="/search" render={() => (
              <Link to="/" className="header__close-search" title="Fechar">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </Link>
            )} />

            <Route exact path="/" render={() => (
              <Link to="/search" className="header__search" title="Procurar/Adicionar livros">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                </svg>
              </Link>
            )} />
          </div>
        </div>
      </header>
    )
  }
}

export default Header